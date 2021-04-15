import nodemailer from "nodemailer";
import sgTransport from "nodemailer-sendgrid-transport";
import hbs from "nodemailer-express-handlebars";

// * Rimbo rent emails
// Production / Development
const rimboEmail = "info@rimbo.rent";
const habitatEmail = "info@habitatapartments.com";
// const rimboEmail = "victor@rimbo.rent";
// const habitatEmail = "victor@rimbo.rent";
// const rimboEmail = "paniaguasanchezadrian@gmail.com";
// const habitatEmail = "paniaguasanchezadrian@gmail.com";

// ? =======>  SPANISH VERSION START ==============================>
// ! F1HA Form => E1R (email to Rimbo) E1HA (email to Habitat)
const sendF1HAFormEmails = async (req, res) => {
  const {
    // Agency
    agencyName,
    // Tenant
    tenantsName,
    tenantsEmail,
    tenantsPhone,
    tenantsAddress,
    tenantsZipCode,
    documentType,
    documentNumber,
    documentImageFront,
    documentImageBack,
    randomID,
    // Tenancy
    product,
    rentAmount,
    rentStartDate,
    rentEndDate,
    tenancyID,
    // Property
    rentalAddress,
    rentalAddressSecond,
    rentalCity,
    rentalPostalCode,
  } = req.body;

  const transporterE1R = nodemailer.createTransport(
    sgTransport({
      auth: {
        api_key: process.env.SENDGRID_API,
      },
    })
  );

  const transporterE1SC = nodemailer.createTransport(
    sgTransport({
      auth: {
        api_key: process.env.SENDGRID_API,
      },
    })
  );

  let optionsE1R = {
    viewEngine: {
      extname: ".handlebars",
      layoutsDir: "views/",
      defaultLayout: "E1REmail",
    },
    viewPath: "views/",
  };

  let optionsE1SC = {
    viewEngine: {
      extname: ".handlebars",
      layoutsDir: "views/",
      defaultLayout: "E1HAEmail",
    },
    viewPath: "views/",
  };

  transporterE1R.use("compile", hbs(optionsE1R));
  transporterE1SC.use("compile", hbs(optionsE1SC));

  const RimboEmail = {
    from: "Rimbo info@rimbo.rent",
    to: rimboEmail, // Rimbo Email
    subject: "Registro de inquilino correcto",
    text: "",
    attachments: [
      {
        filename: "habitat-logo.png",
        path: "./views/images/habitat-logo.png",
        cid: "habitatlogo",
      },
    ],
    template: "E1REmail",
    context: {
      // Agency
      agencyName,
      // Tenant
      tenantsName,
      tenantsEmail,
      tenantsPhone,
      tenantsAddress,
      tenantsZipCode,
      documentType,
      documentNumber,
      documentImageFront,
      documentImageBack,
      randomID,
      // Tenancy
      product,
      rentAmount,
      rentStartDate,
      rentEndDate,
      tenancyID,
      // Property
      rentalAddress,
      rentalAddressSecond,
      rentalCity,
      rentalPostalCode,
    },
  };

  const HabitatEmail = {
    from: "Rimbo info@rimbo.rent",
    to: habitatEmail, // Habitat Email
    subject: "Registro de inquilino correcto",
    text: "",
    attachments: [
      {
        filename: "habitat-logo.png",
        path: "./views/images/habitat-logo.png",
        cid: "habitatlogo",
      },
    ],
    template: "E1HAEmail",
    context: {
      // Agency
      agencyName,
      // Tenant
      tenantsName,
      tenantsEmail,
      tenantsPhone,
      tenantsAddress,
      tenantsZipCode,
      documentType,
      documentNumber,
      documentImageFront,
      documentImageBack,
      randomID,
      // Tenancy
      product,
      rentAmount,
      rentStartDate,
      rentEndDate,
      tenancyID,
      // Property
      rentalAddress,
      rentalAddressSecond,
      rentalCity,
      rentalPostalCode,
    },
  };

  transporterE1R.sendMail(RimboEmail, (err, data) => {
    if (err) {
      console.log("There is an error here...!" + err);
    } else {
      console.log("Email sent!");
    }
  });

  transporterE1SC.sendMail(HabitatEmail, (err, data) => {
    if (err) {
      console.log("There is an error here...!" + err);
    } else {
      console.log("Email sent!");
    }
  });

  res.status(200).json();
};

// ! E1R Email => E2TT (email to Tenant)
const sendE1REmailEmails = async (req, res) => {
  const {
    // Agency
    agencyName,
    // Tenant
    tenantsName,
    tenantsEmail,
    tenantsPhone,
    tenantsAddress,
    tenantsZipCode,
    documentType,
    documentNumber,
    documentImageFront,
    documentImageBack,
    randomID,
    // Tenancy
    product,
    rentAmount,
    rentStartDate,
    rentEndDate,
    tenancyID,
    // Property
    rentalAddress,
    rentalAddressSecond,
    rentalCity,
    rentalPostalCode,
  } = req.body;

  const transporterE2TT = nodemailer.createTransport(
    sgTransport({
      auth: {
        api_key: process.env.SENDGRID_API,
      },
    })
  );

  let optionsE2TT = {
    viewEngine: {
      extname: ".handlebars",
      layoutsDir: "views/",
      defaultLayout: "E2TTEmail",
    },
    viewPath: "views/",
  };

  transporterE2TT.use("compile", hbs(optionsE2TT));

  const TenantEmail = {
    from: "Rimbo info@rimbo.rent",
    to: tenantsEmail, // tenant Email
    subject: "Registro de inquilino correcto",
    text: "",
    attachments: [
      {
        filename: "habitat-logo.png",
        path: "./views/images/habitat-logo.png",
        cid: "habitatlogo",
      },
    ],
    template: "E2TTEmail",
    context: {
      // Agency
      agencyName,
      // Tenant
      tenantsName,
      tenantsEmail,
      tenantsPhone,
      tenantsAddress,
      tenantsZipCode,
      documentType,
      documentNumber,
      documentImageFront,
      documentImageBack,
      randomID,
      // Tenancy
      product,
      rentAmount,
      rentStartDate,
      rentEndDate,
      tenancyID,
      // Property
      rentalAddress,
      rentalAddressSecond,
      rentalCity,
      rentalPostalCode,
    },
  };

  transporterE2TT.sendMail(TenantEmail, (err, data) => {
    if (err) {
      console.log("There is an error here...!" + err);
    } else {
      console.log("Email sent!");
    }
  });

  res.status(200).json();
};

// ! F2HA Form => E2R (email to Rimbo that informs tenant is on F2SC)
const sendNotificationRimbo = async (req, res) => {
  const {
    tenantsName,
    tenantsEmail,
    tenantsPhone,
    agencyName,
    randomID,
  } = req.body;

  const transporterE2R = nodemailer.createTransport(
    sgTransport({
      auth: {
        api_key: process.env.SENDGRID_API,
      },
    })
  );

  let optionsE2R = {
    viewEngine: {
      extname: ".handlebars",
      layoutsDir: "views/",
      defaultLayout: "E2REmail",
    },
    viewPath: "views/",
  };

  transporterE2R.use("compile", hbs(optionsE2R));

  const RimboEmail = {
    from: "Rimbo info@rimbo.rent",
    to: rimboEmail, // Rimbo Email
    subject: `${agencyName}-${tenantsName}-Registration Start`,
    text: "",
    attachments: [
      {
        filename: "habitat-logo.png",
        path: "./views/images/habitat-logo.png",
        cid: "habitatlogo",
      },
    ],
    template: "E2REmail",
    context: {
      tenantsName,
      tenantsEmail,
      tenantsPhone,
      agencyName,
      randomID,
    },
  };

  transporterE2R.sendMail(RimboEmail, (err, data) => {
    if (err) {
      console.log("There is an error here...!" + err);
    } else {
      console.log("Email sent!");
    }
  });

  res.status(200).json();
};

// ! F2HA Form => E3 (Rimbo, tenant, StarCity)
const sendF2SCFormEmails = async (req, res) => {
  const {
    // Agency
    agencyName,
    // Tenant
    tenantsName,
    tenantsEmail,
    tenantsPhone,
    tenantsAddress,
    tenantsZipCode,
    documentType,
    documentNumber,
    documentImageFront,
    documentImageBack,
    randomID,
    // Tenancy
    product,
    rentAmount,
    rentStartDate,
    rentEndDate,
    tenancyID,
    // Property
    rentalAddress,
    rentalAddressSecond,
    rentalCity,
    rentalPostalCode,
  } = req.body;

  const transporterE3R = nodemailer.createTransport(
    sgTransport({
      auth: {
        api_key: process.env.SENDGRID_API,
      },
    })
  );
  const transporterE3TT = nodemailer.createTransport(
    sgTransport({
      auth: {
        api_key: process.env.SENDGRID_API,
      },
    })
  );
  const transporterE3SC = nodemailer.createTransport(
    sgTransport({
      auth: {
        api_key: process.env.SENDGRID_API,
      },
    })
  );
  let optionsE3R = {
    viewEngine: {
      extname: ".handlebars",
      layoutsDir: "views/",
      defaultLayout: "E3REmail",
    },
    viewPath: "views/",
  };
  let optionsE3TT = {
    viewEngine: {
      extname: ".handlebars",
      layoutsDir: "views/",
      defaultLayout: "E3TTEmail",
    },
    viewPath: "views/",
  };
  let optionsE3SC = {
    viewEngine: {
      extname: ".handlebars",
      layoutsDir: "views/",
      defaultLayout: "E3SCEmail",
    },
    viewPath: "views/",
  };

  transporterE3R.use("compile", hbs(optionsE3R));
  transporterE3TT.use("compile", hbs(optionsE3TT));
  transporterE3SC.use("compile", hbs(optionsE3SC));

  // Rimbo Email
  const RimboEmail = {
    from: "Rimbo info@rimbo.rent",
    to: rimboEmail, // Rimbo Email
    subject: "Registro de inquilino correcto",
    text: "",
    attachments: [
      {
        filename: "habitat-logo.png",
        path: "./views/images/habitat-logo.png",
        cid: "habitatlogo",
      },
    ],
    template: "E3REmail",
    context: {
      // Agency
      agencyName,
      // Tenant
      tenantsName,
      tenantsEmail,
      tenantsPhone,
      tenantsAddress,
      tenantsZipCode,
      documentType,
      documentNumber,
      documentImageFront,
      documentImageBack,
      randomID,
      // Tenancy
      product,
      rentAmount,
      rentStartDate,
      rentEndDate,
      tenancyID,
      // Property
      rentalAddress,
      rentalAddressSecond,
      rentalCity,
      rentalPostalCode,
    },
  };
  // Tenant Email
  const TenantEmail = {
    from: "Rimbo info@rimbo.rent",
    to: tenantsEmail, // Tenant Email
    subject: "Registro de inquilino correcto",
    text: "",
    attachments: [
      {
        filename: "habitat-logo.png",
        path: "./views/images/habitat-logo.png",
        cid: "habitatlogo",
      },
      {
        filename: "Tenant_Guía_&_Reglas_generales_Starcity_ES.pdf",
        path: "./views/images/Tenant_Guía_&_Reglas_generales_Starcity_ES.pdf",
      },
    ],
    template: "E3TTEmail",
    context: {
      // Agency
      agencyName,
      // Tenant
      tenantsName,
      tenantsEmail,
      tenantsPhone,
      tenantsAddress,
      tenantsZipCode,
      documentType,
      documentNumber,
      documentImageFront,
      documentImageBack,
      randomID,
      // Tenancy
      product,
      rentAmount,
      rentStartDate,
      rentEndDate,
      tenancyID,
      // Property
      rentalAddress,
      rentalAddressSecond,
      rentalCity,
      rentalPostalCode,
    },
  };
  // Starcity Email
  const HabitatEmail = {
    from: "Rimbo info@rimbo.rent",
    to: habitatEmail, // Habitat Email
    subject: "Registro de inquilino correcto",
    text: "",
    attachments: [
      {
        filename: "habitat-logo.png",
        path: "./views/images/habitat-logo.png",
        cid: "habitatlogo",
      },
    ],
    template: "E3SCEmail",
    context: {
      // Agency
      agencyName,
      // Tenant
      tenantsName,
      tenantsEmail,
      tenantsPhone,
      tenantsAddress,
      tenantsZipCode,
      documentType,
      documentNumber,
      documentImageFront,
      documentImageBack,
      randomID,
      // Tenancy
      product,
      rentAmount,
      rentStartDate,
      rentEndDate,
      tenancyID,
      // Property
      rentalAddress,
      rentalAddressSecond,
      rentalCity,
      rentalPostalCode,
    },
  };

  transporterE3R.sendMail(RimboEmail, (err, data) => {
    if (err) {
      console.log("There is an error here...!" + err);
    } else {
      console.log("Email sent!");
    }
  });

  transporterE3TT.sendMail(TenantEmail, (err, data) => {
    if (err) {
      console.log("There is an error here...!" + err);
    } else {
      console.log("Email sent!");
    }
  });

  transporterE3SC.sendMail(HabitatEmail, (err, data) => {
    if (err) {
      console.log("There is an error here...!" + err);
    } else {
      console.log("Email sent!");
    }
  });

  res.status(200).json();
};
// ? =======>  SPANISH VERSION END ==============================>
////////////////////////////////////////////////////////////////
// ? =======>  ENGLISH VERSION START ==============================>
// ! F1HA Form => E1R
const sendHAFormEmailsEn = async (req, res) => {
  const {
    // Agency
    agencyName,
    // Tenant
    tenantsName,
    tenantsEmail,
    tenantsPhone,
    tenantsAddress,
    tenantsZipCode,
    documentType,
    documentNumber,
    documentImageFront,
    documentImageBack,
    randomID,
    // Tenancy
    product,
    rentAmount,
    rentStartDate,
    rentEndDate,
    tenancyID,
    // Property
    rentalAddress,
    rentalAddressSecond,
    rentalCity,
    rentalPostalCode,
  } = req.body;

  const transporterE1R = nodemailer.createTransport(
    sgTransport({
      auth: {
        api_key: process.env.SENDGRID_API,
      },
    })
  );

  const transporterE1SC = nodemailer.createTransport(
    sgTransport({
      auth: {
        api_key: process.env.SENDGRID_API,
      },
    })
  );

  let optionsE1R = {
    viewEngine: {
      extname: ".handlebars",
      layoutsDir: "views/",
      defaultLayout: "E1REmailEn",
    },
    viewPath: "views/",
  };

  let optionsE1SC = {
    viewEngine: {
      extname: ".handlebars",
      layoutsDir: "views/",
      defaultLayout: "E1HAEmailEn",
    },
    viewPath: "views/",
  };

  transporterE1R.use("compile", hbs(optionsE1R));
  transporterE1SC.use("compile", hbs(optionsE1SC));

  const RimboEmail = {
    from: "Rimbo info@rimbo.rent",
    to: rimboEmail, // Rimbo Email
    subject: "New tenancy from Habitat",
    text: "",
    attachments: [
      {
        filename: "habitat-logo.png",
        path: "./views/images/habitat-logo.png",
        cid: "habitatlogo",
      },
    ],
    template: "E1REmailEn",
    context: {
      // Agency
      agencyName,
      // Tenant
      tenantsName,
      tenantsEmail,
      tenantsPhone,
      tenantsAddress,
      tenantsZipCode,
      documentType,
      documentNumber,
      documentImageFront,
      documentImageBack,
      randomID,
      // Tenancy
      product,
      rentAmount,
      rentStartDate,
      rentEndDate,
      tenancyID,
      // Property
      rentalAddress,
      rentalAddressSecond,
      rentalCity,
      rentalPostalCode,
    },
  };

  const HabitatEmail = {
    from: "Rimbo info@rimbo.rent",
    to: habitatEmail, // Habitat Email
    subject: "New tenancy from Habitat - Rimbo",
    text: "",
    attachments: [
      {
        filename: "habitat-logo.png",
        path: "./views/images/habitat-logo.png",
        cid: "habitatlogo",
      },
    ],
    template: "E1HAEmailEn",
    context: {
      // Agency
      agencyName,
      // Tenant
      tenantsName,
      tenantsEmail,
      tenantsPhone,
      tenantsAddress,
      tenantsZipCode,
      documentType,
      documentNumber,
      documentImageFront,
      documentImageBack,
      randomID,
      // Tenancy
      product,
      rentAmount,
      rentStartDate,
      rentEndDate,
      tenancyID,
      // Property
      rentalAddress,
      rentalAddressSecond,
      rentalCity,
      rentalPostalCode,
    },
  };

  transporterE1R.sendMail(RimboEmail, (err, data) => {
    if (err) {
      console.log("There is an error here...!" + err);
    } else {
      console.log("Email sent!");
    }
  });

  transporterE1SC.sendMail(HabitatEmail, (err, data) => {
    if (err) {
      console.log("There is an error here...!" + err);
    } else {
      console.log("Email sent!");
    }
  });

  res.status(200).json();
};

// ! E1R Email => E2TT (email to Tenant)
const sendE1REmailEmailsEn = async (req, res) => {
  const {
    // Agency
    agencyName,
    // Tenant
    tenantsName,
    tenantsEmail,
    tenantsPhone,
    tenantsAddress,
    tenantsZipCode,
    documentType,
    documentNumber,
    documentImageFront,
    documentImageBack,
    randomID,
    // Tenancy
    product,
    rentAmount,
    rentStartDate,
    rentEndDate,
    tenancyID,
    // Property
    rentalAddress,
    rentalAddressSecond,
    rentalCity,
    rentalPostalCode,
  } = req.body;

  const transporterE2TT = nodemailer.createTransport(
    sgTransport({
      auth: {
        api_key: process.env.SENDGRID_API,
      },
    })
  );

  let optionsE2TT = {
    viewEngine: {
      extname: ".handlebars",
      layoutsDir: "views/",
      defaultLayout: "E2TTEmailEn",
    },
    viewPath: "views/",
  };

  transporterE2TT.use("compile", hbs(optionsE2TT));

  const TenantEmail = {
    from: "Rimbo info@rimbo.rent",
    to: tenantsEmail, // Rimbo Email
    subject: "New tenancy with Habitat - Rimbo",
    text: "",
    attachments: [
      {
        filename: "habitat-logo.png",
        path: "./views/images/habitat-logo.png",
        cid: "habitatlogo",
      },
    ],
    template: "E2TTEmailEn",
    context: {
      // Agency
      agencyName,
      // Tenant
      tenantsName,
      tenantsEmail,
      tenantsPhone,
      tenantsAddress,
      tenantsZipCode,
      documentType,
      documentNumber,
      documentImageFront,
      documentImageBack,
      randomID,
      // Tenancy
      product,
      rentAmount,
      rentStartDate,
      rentEndDate,
      tenancyID,
      // Property
      rentalAddress,
      rentalAddressSecond,
      rentalCity,
      rentalPostalCode,
    },
  };

  transporterE2TT.sendMail(TenantEmail, (err, data) => {
    if (err) {
      console.log("There is an error here...!" + err);
    } else {
      console.log("Email sent!");
    }
  });

  res.status(200).json();
};

// ! F2HA Form => E2R (email to Rimbo that informs tenant is on F2SC)
const sendNotificationRimboEn = async (req, res) => {
  const {
    tenantsName,
    tenantsEmail,
    tenantsPhone,
    agencyName,
    randomID,
  } = req.body;

  const transporterE2R = nodemailer.createTransport(
    sgTransport({
      auth: {
        api_key: process.env.SENDGRID_API,
      },
    })
  );

  let optionsE2R = {
    viewEngine: {
      extname: ".handlebars",
      layoutsDir: "views/",
      defaultLayout: "E2REmailEn",
    },
    viewPath: "views/",
  };

  transporterE2R.use("compile", hbs(optionsE2R));

  const RimboEmail = {
    from: "Rimbo info@rimbo.rent",
    to: rimboEmail, // Rimbo Email
    subject: `${agencyName}-${tenantsName}-Registration Start`,
    text: "",
    attachments: [
      {
        filename: "habitat-logo.png",
        path: "./views/images/habitat-logo.png",
        cid: "habitatlogo",
      },
    ],
    template: "E2REmailEn",
    context: {
      tenantsName,
      tenantsEmail,
      tenantsPhone,
      agencyName,
      randomID,
    },
  };

  transporterE2R.sendMail(RimboEmail, (err, data) => {
    if (err) {
      console.log("There is an error here...!" + err);
    } else {
      console.log("Email sent!");
    }
  });

  res.status(200).json();
};

// ! F2HA Form => E3 (Rimbo, tenant, StarCity)
const sendF2SCFormEmailsEn = async (req, res) => {
  const {
    // Agency
    agencyName,
    // Tenant
    tenantsName,
    tenantsEmail,
    tenantsPhone,
    tenantsAddress,
    tenantsZipCode,
    documentType,
    documentNumber,
    documentImageFront,
    documentImageBack,
    randomID,
    // Tenancy
    product,
    rentAmount,
    rentStartDate,
    rentEndDate,
    tenancyID,
    // Property
    rentalAddress,
    rentalAddressSecond,
    rentalCity,
    rentalPostalCode,
  } = req.body;

  const transporterE3R = nodemailer.createTransport(
    sgTransport({
      auth: {
        api_key: process.env.SENDGRID_API,
      },
    })
  );
  const transporterE3TT = nodemailer.createTransport(
    sgTransport({
      auth: {
        api_key: process.env.SENDGRID_API,
      },
    })
  );
  const transporterE3SC = nodemailer.createTransport(
    sgTransport({
      auth: {
        api_key: process.env.SENDGRID_API,
      },
    })
  );
  let optionsE3R = {
    viewEngine: {
      extname: ".handlebars",
      layoutsDir: "views/",
      defaultLayout: "E3REmailEn",
    },
    viewPath: "views/",
  };
  let optionsE3TT = {
    viewEngine: {
      extname: ".handlebars",
      layoutsDir: "views/",
      defaultLayout: "E3TTEmailEn",
    },
    viewPath: "views/",
  };
  let optionsE3SC = {
    viewEngine: {
      extname: ".handlebars",
      layoutsDir: "views/",
      defaultLayout: "E3SCEmailEn",
    },
    viewPath: "views/",
  };

  transporterE3R.use("compile", hbs(optionsE3R));
  transporterE3TT.use("compile", hbs(optionsE3TT));
  transporterE3SC.use("compile", hbs(optionsE3SC));

  // Rimbo Email
  const RimboEmail = {
    from: "Rimbo info@rimbo.rent",
    to: rimboEmail, // Rimbo Email
    subject: "New tenancy with Habitat - Rimbo",
    text: "",
    attachments: [
      {
        filename: "habitat-logo.png",
        path: "./views/images/habitat-logo.png",
        cid: "habitatlogo",
      },
    ],
    template: "E3REmailEn",
    context: {
      // Agency
      agencyName,
      // Tenant
      tenantsName,
      tenantsEmail,
      tenantsPhone,
      tenantsAddress,
      tenantsZipCode,
      documentType,
      documentNumber,
      documentImageFront,
      documentImageBack,
      randomID,
      // Tenancy
      product,
      rentAmount,
      rentStartDate,
      rentEndDate,
      tenancyID,
      // Property
      rentalAddress,
      rentalAddressSecond,
      rentalCity,
      rentalPostalCode,
    },
  };
  // Tenant Email
  const TenantEmail = {
    from: "Rimbo info@rimbo.rent",
    to: tenantsEmail, // Tenant Email
    subject: "New tenancy with Habitat - Rimbo",
    text: "",
    attachments: [
      {
        filename: "habitat-logo.png",
        path: "./views/images/habitat-logo.png",
        cid: "habitatlogo",
      },
      {
        filename: "Tenant_General_Rules_&_Guidelines_Starcity_EN.pdf",
        path:
          "./views/images/Tenant_General_Rules_&_Guidelines_Starcity_EN.pdf",
      },
    ],
    template: "E3TTEmailEn",
    context: {
      // Agency
      agencyName,
      // Tenant
      tenantsName,
      tenantsEmail,
      tenantsPhone,
      tenantsAddress,
      tenantsZipCode,
      documentType,
      documentNumber,
      documentImageFront,
      documentImageBack,
      randomID,
      // Tenancy
      product,
      rentAmount,
      rentStartDate,
      rentEndDate,
      tenancyID,
      // Property
      rentalAddress,
      rentalAddressSecond,
      rentalCity,
      rentalPostalCode,
    },
  };
  // Starcity Email
  const HAEmail = {
    from: "Rimbo info@rimbo.rent",
    to: habitatEmail, // Habitat Email
    subject: "New tenancy with Habitat - Rimbo",
    text: "",
    attachments: [
      {
        filename: "habitat-logo.png",
        path: "./views/images/habitat-logo.png",
        cid: "habitatlogo",
      },
    ],
    template: "E3SCEmailEn",
    context: {
      // Agency
      agencyName,
      // Tenant
      tenantsName,
      tenantsEmail,
      tenantsPhone,
      tenantsAddress,
      tenantsZipCode,
      documentType,
      documentNumber,
      documentImageFront,
      documentImageBack,
      randomID,
      // Tenancy
      product,
      rentAmount,
      rentStartDate,
      rentEndDate,
      tenancyID,
      // Property
      rentalAddress,
      rentalAddressSecond,
      rentalCity,
      rentalPostalCode,
    },
  };

  transporterE3R.sendMail(RimboEmail, (err, data) => {
    if (err) {
      console.log("There is an error here...!" + err);
    } else {
      console.log("Email sent!");
    }
  });

  transporterE3TT.sendMail(TenantEmail, (err, data) => {
    if (err) {
      console.log("There is an error here...!" + err);
    } else {
      console.log("Email sent!");
    }
  });

  transporterE3SC.sendMail(HAEmail, (err, data) => {
    if (err) {
      console.log("There is an error here...!" + err);
    } else {
      console.log("Email sent!");
    }
  });

  res.status(200).json();
};
// ? =======> ENGLISH VERSION END ==============================>

export {
  sendF1HAFormEmails,
  sendE1REmailEmails,
  sendNotificationRimbo,
  sendF2SCFormEmails,
  sendHAFormEmailsEn,
  sendE1REmailEmailsEn,
  sendNotificationRimboEn,
  sendF2SCFormEmailsEn,
};
