import React, { useState, useMemo, useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import {
  Block,
  Button,
  Modal,
  BaseTable,
  InputSearch,
  StatusBadge,
} from "@USupport-components-library/src";

import { useGetAllGlobalAdmins, useDeleteAdminById } from "#hooks";

import "./admins-list.scss";

/**
 * AdminsList
 *
 * Block to display all global admins
 *
 * @return {jsx}
 */
export const AdminsList = ({ openCreateAdmin, openEditAdmin, adminId }) => {
  const queryClient = useQueryClient();
  const { t, i18n } = useTranslation("admins-list");

  const rows = useMemo(() => {
    return [
      { label: t("user"), sortingKey: "name" },
      { label: t("status"), sortingKey: "status", isCentered: true },
      { label: t("email"), sortingKey: "email" },
      { label: t("phone"), sortingKey: "phone" },
    ];
  }, [i18n.language]);

  const { data } = useGetAllGlobalAdmins();

  const [dataToDisplay, setDataToDisplay] = useState();

  useEffect(() => {
    if (data) {
      setDataToDisplay(data);
    }
  }, [data]);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [adminToDelete, setAdminToDelete] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onDeleteAdminSuccess = () => {
    toast(t("admin_deleted"));
    setIsDeleteModalOpen(false);
    queryClient.invalidateQueries(["global-admins"]);
    setIsSubmitting(false);
  };
  const onDeleteAdminError = (err) => {
    toast(err, { type: "error" });
    setIsSubmitting(false);
  };
  const deleteAdminMutation = useDeleteAdminById(
    onDeleteAdminSuccess,
    onDeleteAdminError
  );

  const confirmDelete = () => {
    setIsSubmitting(true);
    deleteAdminMutation.mutate(adminToDelete);
    setIsDeleteModalOpen(false);
  };

  const handleEditAdmin = (id) => {
    openEditAdmin(id);
  };

  const rowsData = dataToDisplay?.map((admin) => {
    const status = admin.isActive ? "active" : "inactive";
    const statusLabel = admin.isActive ? "active" : "disabled";
    return [
      <p className="text">{admin.name}</p>,
      <StatusBadge label={t(statusLabel)} status={status} />,
      <p className="text">{admin.email}</p>,
      <p className="text">{admin.phone}</p>,
    ];
  });

  const menuOptions = [
    {
      icon: "edit",
      text: t("edit"),
      handleClick: handleEditAdmin,
    },
  ];

  return (
    <React.Fragment>
      <Block classes="admins-list">
        <div className="admins-list__add-admin">
          <h3>{t("global_admins")}</h3>
        </div>
        <BaseTable
          adminId={adminId}
          rows={rows}
          rowsData={rowsData}
          data={dataToDisplay || []}
          updateData={setDataToDisplay}
          menuOptions={menuOptions}
          handleClickPropName="adminId"
          hasSearch
          secondaryButtonLabel={t("add_admin")}
          secondaryButtonAction={openCreateAdmin}
          t={t}
        />
      </Block>
      <Modal
        heading={t("are_you_sure")}
        isOpen={isDeleteModalOpen}
        closeModal={() => setIsDeleteModalOpen(false)}
        ctaLabel={t("delete_icon")}
        ctaHandleClick={confirmDelete}
        secondaryCtaLabel={t("cancel")}
        secondaryCtaHandleClick={() => setIsDeleteModalOpen(false)}
        secondaryCtaType="secondary"
        isCtaDisabled={isSubmitting}
      />
    </React.Fragment>
  );
};
