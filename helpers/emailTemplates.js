const otpEmailTemplates = (otp) => {
  return `
  <div style="margin:0; padding:0; background:#0f172a; font-family:Arial, sans-serif;">

    <table width="100%" cellpadding="0" cellspacing="0" style="background:#0f172a; padding:40px 10px;">
      <tr>
        <td align="center">

          <table width="100%" max-width="600" cellpadding="0" cellspacing="0"
            style="background:#ffffff; border-radius:16px; overflow:hidden; box-shadow:0 10px 30px rgba(0,0,0,0.3);">

            <tr>
              <td style="padding:30px; text-align:center;
                background:linear-gradient(135deg,#6366f1,#22c55e,#06b6d4);">

                <h1 style="margin:0; color:#fff; font-size:24px;">
                  WebNexora Verification
                </h1>

                <p style="margin:8px 0 0; color:#e5e7eb; font-size:13px;">
                  Secure OTP Authentication
                </p>
              </td>
            </tr>

            <tr>
              <td style="padding:35px; text-align:center;">

                <h2 style="margin:0 0 10px; color:#111827;">
                  Verify Your Email Address
                </h2>

                <p style="margin:0 0 25px; color:#6b7280;">
                  Use the OTP below. It will expire in <b>5 minutes</b>.
                </p>

                <!-- FIXED OTP BOX -->
                <div style="display:inline-block; padding:18px 40px; font-size:28px;
                  letter-spacing:10px; font-weight:bold; color:#111827;
                  background:#f8fafc; border-radius:12px;
                  border:2px dashed #6366f1;
                  box-shadow:0 4px 12px rgba(99,102,241,0.15);">
                  ${otp}
                </div>

                <p style="margin-top:25px; font-size:12px; color:#9ca3af;">
                  Didn’t request this? Ignore this email.
                </p>

              </td>
            </tr>

          </table>

        </td>
      </tr>
    </table>

  </div>`;
};

module.exports = { otpEmailTemplates };