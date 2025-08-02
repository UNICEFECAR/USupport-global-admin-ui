import React, { useState, useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import {
  Backdrop,
  InputPhone,
  Input,
  Toggle,
} from "@USupport-components-library/src";
import { validateProperty, validate } from "@USupport-components-library/utils";
import { useCreateAdmin, useGetAdminData, useUpdateAdminData } from "#hooks";

import Joi from "joi";

import "./create-local-admin.scss";

const initialData = {
  name: "",
  surname: "",
  email: "",
  phone: "",
  isActive: false,
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
  countryId,
}) => {
  const queryClient = useQueryClient();
  const { t } = useTranslation("modals", { keyPrefix: "create-local-admin" });

  const baseSchema = {
    name: Joi.string().label(t("name_error")),
    surname: Joi.string().label(t("surname_error")),
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .label(t("email_error")),
    confirmEmail: Joi.string()
      .email({ tlds: { allow: false } })
      .label(t("email_match_error")),
    phone: Joi.string().allow(null, "", " ").optional().label(t("phone_error")),
    isActive: Joi.bool().allow(null, "").optional(),
    adminId: Joi.any(),
    role: Joi.any(),
  };

  const schema = Joi.object(baseSchema);

  const adminDataQuery = useGetAdminData(adminId)[0];
  const adminData = adminDataQuery.data;

  const [data, setData] = useState({
    name: action === "edit" ? adminData?.name || "" : "",
    surname: action === "edit" ? adminData?.surname || "" : "",
    email: action === "edit" ? adminData?.email || "" : "",
    confirmEmail: action === "edit" ? adminData?.email || "" : "",
    phone: action === "edit" ? adminData?.phone || "" : "",
    isActive: action === "edit" ? !!adminData?.isActive : false,
  });
  const [errors, setErrors] = useState({});

  // and check if we are editing an admin
  // if we are, we need to update the state data
  useEffect(() => {
    if (isOpen) {
      const newData = {};
      if (adminData && action === "edit" && adminId) {
        newData.name = adminData.name;
        newData.surname = adminData.surname;
        newData.email = adminData.email;
        newData.confirmEmail = adminData.email;
        newData.phone = adminData.phone;
        newData.adminId = adminData.adminId;
        newData.isActive = adminData.isActive;
        newData.role = adminData.role;
        setData(newData);
      }
      // Check if the state has data left from previous opens
      // and if it does, clear it
      else if ((adminData || data.email) && action === "create") {
        setData(initialData);
      }
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
  };
  const onCreateAdminError = (error) => {
    setErrors({ submit: error });
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
  };
  const onUpdateAdminError = (error) => {
    setErrors({ submit: error });
  };
  const updateAdminMutation = useUpdateAdminData(
    onUpdateAdminSuccess,
    onUpdateAdminError
  );

  const handleBlur = (field, value) => {
    if (
      (field === "email" && data.confirmEmail && value !== data.confirmEmail) ||
      (field === "confirmEmail" && value && data.email && value !== data.email)
    ) {
      setErrors({ confirmEmail: t("email_match_error") });
      return;
    }
    validateProperty(field, value, schema, setErrors);
  };

  const handleSubmit = async () => {
    if (data.email !== data.confirmEmail) {
      setErrors({ submit: t("email_match_error") });
      return;
    }
    if ((await validate(data, schema, setErrors)) === null) {
      delete data["confirmEmail"];
      if (action === "edit") {
        const dataCopy = { ...data };
        updateAdminMutation.mutate({
          ...dataCopy,
          updateById: true,
        });
      } else {
        createAdminMutation.mutate({
          adminCountryId: countryId,
          ...data,
          role: adminType,
        });
      }
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
      isCtaLoading={
        createAdminMutation.isLoading || updateAdminMutation.isLoading
      }
      errorMessage={errors.submit}
    >
      <div className="create-local-admin__content-container">
        <div className="create-local-admin__content-container__toggle">
          <p className="text">{t("enabled")}</p>
          <Toggle
            isToggled={data.isActive}
            setParentState={(value) => handleChange(value, "isActive")}
          />
        </div>
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
        <Input
          label={t("input_email_label")}
          value={data.email}
          onChange={(e) => handleChange(e.currentTarget.value, "email")}
          placeholder={t("input_email_placeholder")}
          onBlur={() => handleBlur("email", data.email)}
          errorMessage={errors.email}
        />
        <Input
          label={t("confirm_email_label")}
          value={data.confirmEmail}
          onChange={(e) => handleChange(e.currentTarget.value, "confirmEmail")}
          placeholder={t("input_email_placeholder")}
          onBlur={() => handleBlur("confirmEmail", data.confirmEmail)}
          errorMessage={errors.confirmEmail}
        />
        <InputPhone
          errorMessage={errors.phone}
          value={data.phone}
          onChange={(value) => handleChange(value, "phone")}
          placeholder={t("input_phone_placeholder")}
          onBlur={() => handleBlur("phone", data.phone)}
          label={t("input_phone_label") + " *"}
        />
      </div>
    </Backdrop>
  );
};
