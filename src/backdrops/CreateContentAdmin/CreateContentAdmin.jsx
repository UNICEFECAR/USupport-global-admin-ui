import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Backdrop,
  Input,
  DropdownWithLabel,
} from "@USupport-components-library/src";

import "./create-content-admin.scss";

/**
 * CreateContentAdmin
 *
 * The CreateContentAdmin backdrop
 *
 * @return {jsx}
 */
export const CreateContentAdmin = ({
  isOpen,
  onClose,
  action = "create",
  adminData,
}) => {
  const { t } = useTranslation("create-content-admin");

  const [data, setData] = useState({
    name: adminData ? adminData.name : "",
    email: adminData ? adminData.email : "",
    phone: adminData ? adminData.phone : "",
    role: adminData ? adminData.role : "",
  });

  const roleOptions = [
    { value: "role1", label: "Role 1" },
    { value: "role2", label: "Role 2" },
    { value: "role3", label: "Role 3" },
    { value: "role4", label: "Role 4" },
    { value: "role5", label: "Role 5" },
  ];

  const handleChange = (value, field) => {
    const dataCopy = { ...data };

    dataCopy[field] = value;

    setData(dataCopy);
  };

  const handleCta = () => {
    if (action === "edit") {
      console.log("edit");
    } else {
      console.log("create");
    }

    onClose();
  };

  return (
    <Backdrop
      classes="create-content-admin"
      title="CreateContentAdmin"
      isOpen={isOpen}
      onClose={onClose}
      heading={action === "edit" ? t("heading_edit") : t("heading_create")}
      ctaLabel={action === "edit" ? t("cta_label_edit") : t("cta_label_create")}
      handleCtaClick={handleCta}
    >
      <div className="create-content-admin__content-container">
        <Input
          label={t("input_name_label")}
          value={data.name}
          onChange={(e) => handleChange(e.currentTarget.value, "name")}
          placeholder={t("input_name_placeholder")}
        />
        <Input
          label={t("input_email_label")}
          value={data.email}
          onChange={(e) => handleChange(e.currentTarget.value, "email")}
          placeholder={t("input_email_placeholder")}
        />
        <Input
          label={t("input_phone_label")}
          value={data.phone}
          onChange={(e) => handleChange(e.currentTarget.value, "phone")}
          placeholder={t("input_phone_placeholder")}
        />
        <DropdownWithLabel
          label={t("dropdown_role_label")}
          options={roleOptions}
          selected={data.role}
          setSelected={(value) => handleChange(value, "role")}
        />
      </div>
    </Backdrop>
  );
};
