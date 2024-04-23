import mail from "@sendgrid/mail";

mail.setApiKey(process.env.SENDGRID_API_KEY as string);

interface sendEmailParams {
  from: string;
  to: string;
  replyTo?: string;
  subject: string;
  html: string;
}

export const sendEmail = async ({
  from,
  to,
  replyTo,
  subject,
  html,
}: sendEmailParams) => {
  try {
    await mail.send({
      from,
      replyTo,
      to,
      subject,
      html,
    });
    return { status: true };
  } catch (error) {
    console.log(error);
    return { status: false, message: (error as Error).message };
  }
};

export const emailTemplate = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <title>Simple Transactional Email</title>
    <style media="all" type="text/css">
      /* -------------------------------------
    GLOBAL RESETS
------------------------------------- */

      body {
        font-family: Helvetica, sans-serif;
        -webkit-font-smoothing: antialiased;
        font-size: 16px;
        line-height: 1.3;
        -ms-text-size-adjust: 100%;
        -webkit-text-size-adjust: 100%;
      }

      table {
        border-collapse: separate;
        width: 100%;
      }

      table td {
        font-family: Helvetica, sans-serif;
        font-size: 16px;
        vertical-align: top;
      }
      /* -------------------------------------
    BODY & CONTAINER
------------------------------------- */

      body {
        background-color: #f4f5f6;
        margin: 0;
        padding: 0;
      }

      .body {
        background-color: #f4f5f6;
        width: 100%;
      }

      .container {
        margin: 0 auto !important;
        max-width: 600px;
        padding: 0;
        padding-top: 24px;
        width: 600px;
      }

      .content {
        box-sizing: border-box;
        display: block;
        margin: 0 auto;
        max-width: 600px;
        padding: 0;
      }
      /* -------------------------------------
    HEADER, FOOTER, MAIN
------------------------------------- */

      .main {
        background: #ffffff;
        border: 1px solid #eaebed;
        border-radius: 16px;
        width: 100%;
      }

      .wrapper {
        box-sizing: border-box;
        padding: 24px;
      }

      .footer {
        clear: both;
        padding-top: 24px;
        text-align: center;
        width: 100%;
      }

      .footer td,
      .footer p,
      .footer span,
      .footer a {
        color: #9a9ea6;
        font-size: 16px;
        text-align: center;
      }
      /* -------------------------------------
    TYPOGRAPHY
------------------------------------- */

      p {
        font-family: Helvetica, sans-serif;
        font-size: 16px;
        font-weight: normal;
        margin: 0;
        margin-bottom: 16px;
      }

      a {
        color: #0867ec;
        text-decoration: underline;
      }

      .message {
        line-height: 1.5;
      }
      /* -------------------------------------
    OTHER STYLES THAT MIGHT BE USEFUL
------------------------------------- */

      .last {
        margin-bottom: 0;
      }

      .first {
        margin-top: 0;
      }

      .align-center {
        text-align: center;
      }

      .align-right {
        text-align: right;
      }

      .align-left {
        text-align: left;
      }

      .text-link {
        color: #0867ec !important;
        text-decoration: underline !important;
      }

      .clear {
        clear: both;
      }

      .mt0 {
        margin-top: 0;
      }

      .mb0 {
        margin-bottom: 0;
      }

      .preheader {
        color: transparent;
        display: none;
        height: 0;
        max-height: 0;
        max-width: 0;
        opacity: 0;
        overflow: hidden;
        visibility: hidden;
        width: 0;
      }

      .powered-by a {
        text-decoration: none;
      }

      /* -------------------------------------
    RESPONSIVE AND MOBILE FRIENDLY STYLES
------------------------------------- */

      @media only screen and (max-width: 640px) {
        .main p,
        .main td,
        .main span {
          font-size: 16px !important;
        }
        .wrapper {
          padding: 8px !important;
        }
        .content {
          padding: 0 !important;
        }
        .container {
          padding: 0 !important;
          padding-top: 8px !important;
          width: 100% !important;
        }
        .main {
          border-left-width: 0 !important;
          border-radius: 0 !important;
          border-right-width: 0 !important;
        }
        .btn table {
          max-width: 100% !important;
          width: 100% !important;
        }
        .btn a {
          font-size: 16px !important;
          max-width: 100% !important;
          width: 100% !important;
        }
      }
      /* -------------------------------------
    PRESERVE THESE STYLES IN THE HEAD
------------------------------------- */

      @media all {
        .ExternalClass {
          width: 100%;
        }
        .ExternalClass,
        .ExternalClass p,
        .ExternalClass span,
        .ExternalClass font,
        .ExternalClass td,
        .ExternalClass div {
          line-height: 100%;
        }
        .apple-link a {
          color: inherit !important;
          font-family: inherit !important;
          font-size: inherit !important;
          font-weight: inherit !important;
          line-height: inherit !important;
          text-decoration: none !important;
        }
        #MessageViewBody a {
          color: inherit;
          text-decoration: none;
          font-size: inherit;
          font-family: inherit;
          font-weight: inherit;
          line-height: inherit;
        }
      }
    </style>
  </head>
  <body>
    <table
      role="presentation"
      border="0"
      cellpadding="0"
      cellspacing="0"
      class="body"
    >
      <tr>
        <td>&nbsp;</td>
        <td class="container">
          <div class="content">
            <!-- START CENTERED WHITE CONTAINER -->
            <span class="preheader"
              >This is preheader text. Some clients will show this text as a
              preview.</span
            >
            <table
              role="presentation"
              border="0"
              cellpadding="0"
              cellspacing="0"
              class="main"
            >
              <!-- START MAIN CONTENT AREA -->
              <tr>
                <td class="wrapper">
                  <p>{website}</p>

                  <p>{name}</p>
                  <p>
                    <a href="https://wa.me/{phoneOnlyNumbers}" target="_blank"
                      >{phone}</a
                    >
                  </p>
                  <br />
                  <p class="message">{message}</p>
                </td>
              </tr>

              <!-- END MAIN CONTENT AREA -->
            </table>

            <!-- END CENTERED WHITE CONTAINER -->
          </div>
        </td>
        <td>&nbsp;</td>
      </tr>
    </table>
  </body>
</html>
`;
