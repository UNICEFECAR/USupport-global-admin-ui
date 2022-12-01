import React, { useState, useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import {
  Backdrop,
  DropdownWithLabel,
  Error,
  Input,
  InputPassword,
  Toggle,
} from "@USupport-components-library/src";
import { validateProperty, validate } from "@USupport-components-library/utils";
import { useCreateAdmin, useGetAdminData, useUpdateAdminData } from "#hooks";

import countryCodes from "country-codes-list";
import Joi from "joi";

import "./create-local-admin.scss";

const initialData = {
  name: "",
  surname: "",
  email: "",
  password: "",
  phone: "",
};

/**
 * CreateLocalAdmin
 * Used to create both a country or global admin
 * The CreateLocalAdmin backdrop
 *
 * @return {jsx}
 */
export const CreateLocalAdmin = ({
  isOpen,
  onClose,
  action = "create",
  adminType = "country",
  adminId,
}) => {
  const queryClient = useQueryClient();
  const { t } = useTranslation("create-local-admin");

  const baseSchema = {
    name: Joi.string().label(t("name_error")),
    surname: Joi.string().label(t("surname_error")),
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .label(t("email_error")),
    phonePrefix: Joi.string()
      .allow(null, "", " ")
      .optional()
      .label(t("phone_error")),
    phone: Joi.string().allow(null, "", " ").optional().label(t("phone_error")),
    isActive: Joi.bool().allow(null, "").optional(),
    adminId: Joi.any(),
  };

  if (action === "create") {
    baseSchema.password = Joi.string()
      .pattern(new RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}"))
      .label(t("password_error"));
  }
  const schema = Joi.object(baseSchema);

  const adminData = useGetAdminData(adminId)[1];

  const [data, setData] = useState({
    name: action === "edit" ? adminData?.name || "" : "",
    surname: action === "edit" ? adminData?.surname || "" : "",
    password: "",
    email: action === "edit" ? adminData?.email || "" : "",
    phone: action === "edit" ? adminData?.phone || "" : "",
    isActive: action === "edit" ? adminData?.isActive || true : true,
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [phonePrefixes, setPhonePrefixes] = useState(generateCountryCodes());

  // Generate the phone prefix dropdown options
  // and check if we are editing an admin
  // if we are, we need to update the state data
  useEffect(() => {
    if (isOpen) {
      const codes = generateCountryCodes();
      const newData = {};
      if (adminData && action === "edit") {
        newData.name = adminData.name;
        newData.surname = adminData.surname;
        newData.email = adminData.email;
        newData.phone = adminData.phone;
        newData.phonePrefix = adminData.phonePrefix;
        newData.adminId = adminData.adminId;
        newData.isActive = adminData.isActive;

        if (!adminData?.phonePrefix) {
          const usersCountry = localStorage.getItem("country");

          const userCountryCode = codes.find(
            (x) => x.country === usersCountry
          )?.value;

          newData.phonePrefix = userCountryCode
            ? userCountryCode
            : codes.find((x) => x.country === "KZ")?.value;
        }
        setData(newData);
      }
      // Check if the state has data left from previous opens
      // and if it does, clear it
      else if ((adminData || data.email) && action === "create") {
        setData(initialData);
      }
      setPhonePrefixes(codes);
    }
  }, [adminData, isOpen]);

  const handleChange = (value, field) => {
    const dataCopy = { ...data };
    dataCopy[field] = value;
    setData(dataCopy);
  };

  // < ------------------ Create Admin ------------------ >
  const onCreateAdminSuccess = () => {
    queryClient.invalidateQueries({ queryKey: [`${adminType}-admins`] });
    setData(initialData);
    toast(t("admin_created"));
    onClose();
    setIsSubmitting(false);
  };
  const onCreateAdminError = (error) => {
    setErrors({ submit: error });
    setIsSubmitting(false);
  };
  const createAdminMutation = useCreateAdmin(
    onCreateAdminSuccess,
    onCreateAdminError
  );

  // < ------------------ Update Admin ------------------ >
  const onUpdateAdminSuccess = () => {
    queryClient.invalidateQueries({ queryKey: [`${adminType}-admins`] });
    setData(initialData);
    toast(t("admin_updated"));
    onClose();
    setIsSubmitting(false);
  };
  const onUpdateAdminError = (error) => {
    setErrors({ submit: error });
    setIsSubmitting(false);
  };
  const updateAdminMutation = useUpdateAdminData(
    onUpdateAdminSuccess,
    onUpdateAdminError
  );

  const handleBlur = (field, value) => {
    if (adminType === "country" && field === "password") return;
    validateProperty(field, value, schema, setErrors);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    if ((await validate(data, schema, setErrors)) === null) {
      if (action === "edit") {
        const dataCopy = { ...data };
        delete dataCopy.password;
        updateAdminMutation.mutate({
          ...dataCopy,
          updateById: true,
        });
      } else {
        createAdminMutation.mutate({
          adminCountryId: localStorage.getItem("country_id"),
          ...data,
          role: adminType,
        });
      }
    } else {
      setIsSubmitting(false);
    }
  };

  return (
    <Backdrop
      classes="create-local-admin"
      title="CreateLocalAdmin"
      isOpen={isOpen}
      onClose={onClose}
      heading={
        action === "create"
          ? t(`heading_create_${adminType}`)
          : t("heading_edit")
      }
      text={action === "create" && t("subheading_create")}
      ctaLabel={action === "edit" ? t("cta_label_edit") : t("cta_label_create")}
      ctaHandleClick={handleSubmit}
      isCtaDisabled={isSubmitting}
      errorMessage={errors.submit}
    >
      <div className="create-local-admin__content-container">
        <p className="text">{t("enabled")}</p>
        <Toggle
          isToggled={data.isActive}
          setParentState={(value) => handleChange(value, "isActive")}
        />
        <Input
          label={t("input_name_label")}
          value={data.name}
          onChange={(e) => handleChange(e.currentTarget.value, "name")}
          placeholder={t("input_name_placeholder")}
          onBlur={() => handleBlur("name", data.name)}
          errorMessage={errors.name}
        />
        <Input
          label={t("input_surname_label")}
          value={data.surname}
          onChange={(e) => handleChange(e.currentTarget.value, "surname")}
          placeholder={t("input_surname_placeholder")}
          onBlur={() => handleBlur("surname", data.surname)}
          errorMessage={errors.surname}
        />
        {action === "create" && (
          <InputPassword
            label={t("input_password_label")}
            value={data.password}
            onChange={(e) => handleChange(e.currentTarget.value, "password")}
            placeholder={t("input_password_placeholder")}
            onBlur={() => handleBlur("password", data.password)}
            errorMessage={errors.password}
          />
        )}
        <Input
          label={t("input_email_label")}
          value={data.email}
          onChange={(e) => handleChange(e.currentTarget.value, "email")}
          placeholder={t("input_email_placeholder")}
          onBlur={() => handleBlur("email", data.email)}
          errorMessage={errors.email}
        />
        <div className="create-local-admin__content-container__phone-container">
          <DropdownWithLabel
            options={phonePrefixes}
            label={t("input_phone_prefix_label")}
            selected={data.phonePrefix}
            setSelected={(value) => handleChange(value, "phonePrefix")}
          />
          <Input
            label={t("input_phone_label")}
            classes="create-local-admin__content-container__phone-container__phone-input"
            value={data.phone}
            onChange={(e) => handleChange(e.currentTarget.value, "phone")}
            placeholder={t("input_phone_placeholder")}
            onBlur={() => handleBlur("phone", data.phone)}
          />
        </div>
        {errors.phone || errors.phonePrefix ? (
          <Error
            classes="create-local-admin__content-container__phone-error"
            message={errors.phone || errors.phonePrefix}
          />
        ) : null}
      </div>
    </Backdrop>
  );
};

function generateCountryCodes() {
  const countryCodesList = countryCodes.customList(
    "countryCode",
    "+{countryCallingCode}"
  );
  const codes = [];
  Object.keys(countryCodesList).forEach((key) => {
    codes.push({
      value: countryCodesList[key],
      label: `${key}: ${countryCodesList[key]}`,
      country: key,
    });
  });

  return codes;
}
