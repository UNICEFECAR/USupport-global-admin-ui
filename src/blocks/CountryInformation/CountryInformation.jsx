import React, { useState, useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";

import { Statistics } from "#blocks";
import { useGetAllCountryAdmins, useDeleteAdminById } from "#hooks";
import {
  Button,
  Block,
  Grid,
  GridItem,
  Modal,
  InputSearch,
  StatusBadge,
  BaseTable,
} from "@USupport-components-library/src";

import "./country-information.scss";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";

/**
 * CountryInformation
 *
 * Country information block
 *
 * @return {jsx}
 */
export const CountryInformation = ({
  openCreateAdmin,
  openEditAdmin,
  countryId,
}) => {
  const queryClient = useQueryClient();

  const { t, i18n } = useTranslation("country-information");
  const rows = useMemo(() => {
    return [
      { label: t("user"), sortingKey: "name" },
      { label: t("status"), sortingKey: "status", isCentered: true },
      { label: t("email"), sortingKey: "email" },
      { label: t("phone"), sortingKey: "phone" },
    ];
  }, [i18n.language]);

  const { data } = useGetAllCountryAdmins(countryId);

  const [dataToDisplay, setDataToDisplay] = useState();
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    if (data) {
      setDataToDisplay(data);
    }
  }, [data]);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [adminToDelete, setAdminToDelete] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onDeleteAdminSuccess = () => {
    queryClient.invalidateQueries(["country-admins"]);
    toast(t("admin_deleted"));
    setIsDeleteModalOpen(false);
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
  const handleEdit = (id) => {
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
      handleClick: handleEdit,
    },
  ];

  return (
    <React.Fragment>
      <Statistics countryId={countryId} />
      <Block classes="country-information">
        <Grid classes="country-information__add-admin">
          <GridItem md={4} lg={6}>
            <h3>{t("country_admins")}</h3>
          </GridItem>
        </Grid>
        <BaseTable
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
