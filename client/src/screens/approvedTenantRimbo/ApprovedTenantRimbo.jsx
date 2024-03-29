// React components
import React, { useState, useEffect, useReducer } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

// Custom Components
import NavBar from "../../components/NavBar/NavBar";
import CustomHelmet from "../../components/Helmet/CustomHelmet";
import Success from "../../components/Success/Success";
import Footer from "../../components/Footer/Footer";

// Reducer
import { TenantReducer, DefaultTenant } from "./approved_tenant_rimbo-reducer";

// Multi language
import { withNamespaces } from "react-i18next";
// import i18n from "../../i18n";

// End-Points env
const {
  REACT_APP_BASE_URL,
  REACT_APP_API_RIMBO_TENANCY,
  REACT_APP_BASE_URL_EMAIL,
  REACT_APP_API_RIMBO_TENANT,
} = process.env;

const ApprovedTenantRimbo = ({ t }) => {
  let { tenancyID } = useParams();
  const randomID = tenancyID;
  const [tenant] = useReducer(TenantReducer, DefaultTenant);

  const [state, setState] = useState(null); // eslint-disable-line

  useEffect(() => {
    const fetchUserData = () =>
      axios.get(
        `${REACT_APP_BASE_URL}${REACT_APP_API_RIMBO_TENANCY}/${tenancyID}`
      );

    const postDecision = (body) =>
      axios.post(
        `${REACT_APP_BASE_URL}${REACT_APP_API_RIMBO_TENANT}/${randomID}/approved`,
        body
      );

    const processDecision = async () => {
      const { data: tenancyData } = await fetchUserData();

      const postBody = {
        isRimboAccepted: tenant.isRimboAccepted,
        randomID: tenancyData.tenant.randomID,
      };

      const { data: decisionResult } = await postDecision(postBody);

      const { tenantsName, tenantsEmail, randomID } = tenancyData.tenant;
      const { agencyName } = tenancyData.agent;
      const { rentalAddress } = tenancyData.property;
      const { tenancyID } = tenancyData;

      if (tenancyData.tenant.isRimboAccepted === false) {
        axios.post(`${REACT_APP_BASE_URL_EMAIL}/e2tt`, {
          tenantsName,
          tenantsEmail,
          randomID,
          agencyName,
          rentalAddress,
          tenancyID,
        });
      }

      setState(decisionResult);
    };

    processDecision();
  }, [randomID, tenant.isRimboAccepted, tenancyID]);

  return (
    <>
      <CustomHelmet header={t("approvedRimbo.header")} />
      <NavBar />
      <Success
        title={t("approvedRimbo.title")}
        subtitle={t("approvedRimbo.subtitle")}
      />
      <Footer />
    </>
  );
};

export default withNamespaces()(ApprovedTenantRimbo);
