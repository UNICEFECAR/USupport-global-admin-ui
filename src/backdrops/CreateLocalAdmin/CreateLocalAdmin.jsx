import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Backdrop, Input } from "@USupport-components-library/src";

import "./create-local-admin.scss";

/**
 * CreateLocalAdmin
 *
 * The CreateLocalAdmin backdrop
 *
 * @return {jsx}
 */
export const CreateLocalAdmin = ({
  isOpen,
  onClose,
  action = "create",
  adminData,
}) => {
  const { t } = useTranslation("create-local-admin");

  const [data, setData] = useState({
    name: adminData ? adminData.name : "",
    email: adminData ? adminData.email : "",
    phone: adminData ? adminData.phone : "",
  });

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
      classes="create-local-admin"
      title="CreateLocalAdmin"
      isOpen={isOpen}
      onClose={onClose}
      heading={action === "create" ? t("heading_create") : t("heading_edit")}
      text={action === "create" && t("subheading_create")}
      ctaLabel={action === "edit" ? t("cta_label_edit") : t("cta_label_create")}
      handleCtaClick={handleCta}
    >
      <div className="create-local-admin__content-container">
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
      </div>
    </Backdrop>
  );
};
