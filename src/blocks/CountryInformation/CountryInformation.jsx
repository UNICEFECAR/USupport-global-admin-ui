import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { Statistics } from "#blocks";
import { useGetAllCountryAdmins, useDeleteAdminById } from "#hooks";
import {
  AdminsTable,
  Button,
  Block,
  Icon,
  Grid,
  GridItem,
  Modal,
  InputSearch,
} from "@USupport-components-library/src";

import "./country-information.scss";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

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

  const { t } = useTranslation("country-information");
  const rows = [
    { label: t("user"), sortingKey: "name" },
    { label: t("status"), sortingKey: "status" },
    { label: t("email"), sortingKey: "email" },
    { label: t("phone"), sortingKey: "phone" },
  ];

  const { isLoading, data } = useGetAllCountryAdmins(countryId);

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
  // Open the delete modal and set the id in the state
  const handleDelete = (id) => {
    setAdminToDelete(id);
    setIsDeleteModalOpen(true);
  };
  const handleEdit = (id) => {
    openEditAdmin(id);
  };

  return (
    <React.Fragment>
      <Statistics countryId={countryId} />
      <Block classes="country-information">
        <Grid classes="country-information__add-admin">
          <GridItem md={4} lg={6}>
            <h3>{t("country_admins")}</h3>
          </GridItem>
          <GridItem md={4} lg={6}>
            <Button
              size="md"
              type="primary"
              color="purple"
              label={t("add_admin")}
              onClick={openCreateAdmin}
              web
            />
          </GridItem>
        </Grid>
        <InputSearch
          placeholder={t("search")}
          value={searchValue}
          onChange={setSearchValue}
          classes="country-information__search"
        />
        <AdminsTable
          isLoading={isLoading}
          rows={rows}
          data={dataToDisplay || []}
          updateData={setDataToDisplay}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
          searchValue={searchValue}
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
