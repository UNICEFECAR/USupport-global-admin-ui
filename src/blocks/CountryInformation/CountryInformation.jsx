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
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { t } = useTranslation("country-information");
  const rows = ["user", "status", "email", "phone", ""];
  const { isLoading, data } = useGetAllCountryAdmins(countryId);

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

        <AdminsTable
          isLoading={isLoading}
          rows={rows}
          data={data}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
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
