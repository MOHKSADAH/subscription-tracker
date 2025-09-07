export const generateEmailTemplate = ({
    userName,
    subscriptionName,
    renewalDate,
    planName,
    price,
    paymentMethod,
    accountSettingsLink,
    supportLink,
    daysLeft,
}) => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Subscription Renewal Reminder</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f8fafc; font-family: Arial, sans-serif; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%;">
    <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color: #f8fafc; margin: 0; padding: 0;">
        <tr>
            <td align="center" style="padding: 20px;">
                <table cellpadding="0" cellspacing="0" border="0" width="600" style="max-width: 600px; background-color: #ffffff; border-radius: 12px; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1); border: 1px solid #e2e8f0;">
                    
                    <!-- Header Section -->
                    <tr>
                        <td align="center" style="background: linear-gradient(135deg, #000000ff 0%, #19151eff 100%); padding: 30px 20px; text-align: center; border-radius: 12px 12px 0 0;">
                            <table cellpadding="0" cellspacing="0" border="0" width="100%">
                                <tr>
                                    <td align="center" style="padding-bottom: 10px;">
                                        <table cellpadding="0" cellspacing="0" border="0">
                                            <tr>
                                                <td style="background: rgba(255, 255, 255, 0.2); border-radius: 20px; padding: 6px 16px;">
                                                    <span style="color: #ffffff; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">SUBSCRIPTION ALERT</span>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                                <tr>
                                    <td align="center">
                                        <h1 style="color: #ffffff; font-size: 26px; font-weight: 700; margin: 0; padding: 0; line-height: 1.3;">
                                            📱 SubTracker
                                        </h1>
                                    </td>
                                </tr>
                                <tr>
                                    <td align="center" style="padding-top: 5px;">
                                        <p style="color: rgba(255, 255, 255, 0.9); font-size: 14px; margin: 0; font-weight: 400;">
                                            Keep track of your subscriptions
                                        </p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    
                    <!-- Main Content -->
                    <tr>
                        <td style="padding: 30px 25px;">
                            
                            <!-- Greeting -->
                            <table cellpadding="0" cellspacing="0" border="0" width="100%">
                                <tr>
                                    <td align="center" style="padding-bottom: 20px;">
                                        <h2 style="color: #2d3748; font-size: 20px; font-weight: 600; margin: 0; padding: 0; line-height: 1.3;">
                                            Hello ${userName}! 👋
                                        </h2>
                                        <p style="color: #718096; font-size: 15px; margin: 8px 0 0 0; line-height: 1.4;">
                                            We wanted to remind you about your upcoming renewal
                                        </p>
                                    </td>
                                </tr>
                            </table>
                            
                            <!-- Days Counter -->
                            <table cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-bottom: 25px;">
                                <tr>
                                    <td align="center">
                                        <table cellpadding="0" cellspacing="0" border="0">
                                            <tr>
                                                <td align="center" style="background: linear-gradient(135deg, #ff6b6b 0%, #ff8e8e 100%); color: white; padding: 10px 24px; border-radius: 25px; font-weight: 600; font-size: 15px;">
                                                    ${
                                                        daysLeft === 0
                                                            ? '🚨 Renews Today!'
                                                            : daysLeft === 1
                                                            ? '⚡ Renews Tomorrow!'
                                                            : `⏰ ${daysLeft} Days Left`
                                                    }
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                            
                            <!-- Subscription Info Card -->
                            <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background: #f8fafc; border-radius: 8px; margin-bottom: 25px; border-left: 4px solid #667eea;">
                                <tr>
                                    <td style="padding: 20px;">
                                        <!-- Card Header -->
                                        <table cellpadding="0" cellspacing="0" border="0" width="100%">
                                            <tr>
                                                <td style="padding-bottom: 15px;">
                                                    <table cellpadding="0" cellspacing="0" border="0" width="100%">
                                                        <tr>
                                                            <td width="30" valign="middle">
                                                                <span style="background: #667eea; color: white; border-radius: 4px; padding: 6px; font-size: 14px; display: inline-block; text-align: center;">📋</span>
                                                            </td>
                                                            <td style="padding-left: 10px; vertical-align: middle;">
                                                                <h3 style="color: #2d3748; font-size: 16px; font-weight: 600; margin: 0; padding: 0;">
                                                                    Subscription Details
                                                                </h3>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </td>
                                            </tr>
                                        </table>
                                        
                                        <!-- Service Row -->
                                        <table cellpadding="0" cellspacing="0" border="0" width="100%" style="border-bottom: 1px solid #e2e8f0;">
                                            <tr>
                                                <td style="padding: 10px 0;">
                                                    <table cellpadding="0" cellspacing="0" border="0" width="100%">
                                                        <tr>
                                                            <td width="50%" align="left" style="color: #4a5568; font-size: 18px;">
                                                                🎯 Service:
                                                            </td>
                                                            <td width="50%" align="right" style="color: #2d3748; font-weight: 600; font-size: 18px;">
                                                                ${subscriptionName}
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </td>
                                            </tr>
                                        </table>
                                        
                                        <!-- Plan Row -->
                                        <table cellpadding="0" cellspacing="0" border="0" width="100%" style="border-bottom: 1px solid #e2e8f0;">
                                            <tr>
                                                <td style="padding: 10px 0;">
                                                    <table cellpadding="0" cellspacing="0" border="0" width="100%">
                                                        <tr>
                                                            <td width="50%" align="left" style="color: #4a5568; font-size: 18px;">
                                                                📦 Plan:
                                                            </td>
                                                            <td width="50%" align="right" style="color: #2d3748; font-weight: 600; font-size: 18px;">
                                                                ${planName}
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </td>
                                            </tr>
                                        </table>
                                        
                                        <!-- Amount Row -->
                                        <table cellpadding="0" cellspacing="0" border="0" width="100%" style="border-bottom: 1px solid #e2e8f0;">
                                            <tr>
                                                <td style="padding: 10px 0;">
                                                    <table cellpadding="0" cellspacing="0" border="0" width="100%">
                                                        <tr>
                                                            <td width="50%" align="left" style="color: #4a5568; font-size: 18px;">
                                                                💰 Amount:
                                                            </td>
                                                            <td width="50%" align="right" style="color: #667eea; font-weight: 700; font-size: 18px;">
                                                                ${price}
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </td>
                                            </tr>
                                        </table>
                                        
                                        <!-- Payment Row -->
                                        <table cellpadding="0" cellspacing="0" border="0" width="100%" style="border-bottom: 1px solid #e2e8f0;">
                                            <tr>
                                                <td style="padding: 10px 0;">
                                                    <table cellpadding="0" cellspacing="0" border="0" width="100%">
                                                        <tr>
                                                            <td width="50%" align="left" style="color: #4a5568; font-size: 18px;">
                                                                💳 Payment:
                                                            </td>
                                                            <td width="50%" align="right" style="color: #2d3748; font-weight: 600; font-size: 18px;">
                                                                ${paymentMethod}
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </td>
                                            </tr>
                                        </table>
                                        
                                        <!-- Renewal Date Row -->
                                        <table cellpadding="0" cellspacing="0" border="0" width="100%">
                                            <tr>
                                                <td style="padding: 10px 0;">
                                                    <table cellpadding="0" cellspacing="0" border="0" width="100%">
                                                        <tr>
                                                            <td width="50%" align="left" style="color: #4a5568; font-size: 18px;">
                                                                📅 Renewal Date:
                                                            </td>
                                                            <td width="50%" align="right" style="color: #e53e3e; font-weight: 700; font-size: 18px;">
                                                                ${renewalDate}
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                            
                            <!-- Action Buttons -->
                            <table cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-bottom: 25px;">
                                <tr>
                                    <td align="center">
                                        <table cellpadding="0" cellspacing="0" border="0">
                                            <tr>
                                                <td style="padding: 5px;">
                                                    <a href="${accountSettingsLink}" style="background: linear-gradient(135deg, #464c45ff 0%, #000000ff 100%); color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 14px; display: inline-block;">
                                                        🔧 Manage Subscription
                                                    </a>
                                                </td>
                                                <td style="padding: 5px;">
                                                    <a href="${supportLink}" style="background: transparent; color: #667eea; padding: 12px 24px; text-decoration: none; border-radius: 6px; border: 1px solid #667eea; font-weight: 600; font-size: 14px; display: inline-block;">
                                                        💬 Contact Support
                                                    </a>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                            
                            <!-- Info Box -->
                            <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background: #e6fffa; border-radius: 6px; margin-bottom: 25px; border-left: 3px solid #38b2ac;">
                                <tr>
                                    <td style="padding: 15px 20px;">
                                        <table cellpadding="0" cellspacing="0" border="0" width="100%">
                                            <tr>
                                                <td style="padding-bottom: 10px;">
                                                    <h4 style="color: #2d3748; font-size: 15px; font-weight: 600; margin: 0; padding: 0;">
                                                        💡 What happens next?
                                                    </h4>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style="color: #4a5568; font-size: 13px; line-height: 1.5;">
                                                    • Your subscription will automatically renew on <strong>${renewalDate}</strong><br>
                                                    • We'll charge your ${paymentMethod} for <strong>${price}</strong><br>
                                                    • You can modify or cancel anytime before renewal<br>
                                                    • You'll receive a confirmation email after successful renewal
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                            
                            <!-- Footer Message -->
                            <table cellpadding="0" cellspacing="0" border="0" width="100%">
                                <tr>
                                    <td align="center" style="padding-top: 20px; border-top: 1px solid #f7fafc;">
                                        <p style="color: #718096; font-size: 13px; line-height: 1.4; margin: 0 0 10px 0;">
                                            Questions? Our support team is here to help! Just reply to this email or contact us.
                                        </p>
                                        <p style="color: #2d3748; font-size: 15px; font-weight: 600; margin: 0;">
                                            Thank you for being a valued subscriber! 🎉<br>
                                            <span style="color: #667eea;">The SubTracker Team</span>
                                        </p>
                                    </td>
                                </tr>
                            </table>
                            
                        </td>
                    </tr>
                    
                    <!-- Footer -->
                    <tr>
                        <td align="center" style="background: #f8fafc; padding: 20px; text-align: center; border-top: 1px solid #e2e8f0; border-radius: 0 0 12px 12px;">
                            <table cellpadding="0" cellspacing="0" border="0" width="100%">
                                <tr>
                                    <td align="center">
                                        <p style="color: #2d3748; font-weight: 600; font-size: 13px; margin: 0 0 5px 0;">
                                            📍 SubTracker
                                        </p>
                                        <p style="color: #718096; font-size: 12px; margin: 0 0 10px 0;">
                                            Saudi Arabia, Eastern Province, Saihat
                                        </p>
                                        <p style="margin: 0 0 10px 0;">
                                            <a href="#" style="color: #667eea; text-decoration: none; margin: 0 8px; font-size: 12px; font-weight: 500;">Unsubscribe</a>
                                            <span style="color: #cbd5e0;">|</span>
                                            <a href="#" style="color: #667eea; text-decoration: none; margin: 0 8px; font-size: 12px; font-weight: 500;">Privacy Policy</a>
                                            <span style="color: #cbd5e0;">|</span>
                                            <a href="#" style="color: #667eea; text-decoration: none; margin: 0 8px; font-size: 12px; font-weight: 500;">Terms of Service</a>
                                        </p>
                                        <p style="color: #a0aec0; font-size: 11px; margin: 0; line-height: 1.3;">
                                            This email was sent to you because you have an active subscription with us.<br>
                                            © 2025 SubTracker. All rights reserved.
                                        </p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
`;

export const emailTemplates = [
    {
        label: '7 days before reminder',
        generateSubject: (data) =>
            `📅 Reminder: Your ${data.subscriptionName} Subscription Renews in 7 Days!`,
        generateBody: (data) => generateEmailTemplate({ ...data, daysLeft: 7 }),
    },
    {
        label: 'Reminder 7 days before',
        generateSubject: (data) =>
            `📅 Reminder: Your ${data.subscriptionName} Subscription Renews in 7 Days!`,
        generateBody: (data) => generateEmailTemplate({ ...data, daysLeft: 7 }),
    },
    {
        label: '5 days before reminder',
        generateSubject: (data) =>
            `⏳ ${data.subscriptionName} Renews in 5 Days – Stay Subscribed!`,
        generateBody: (data) => generateEmailTemplate({ ...data, daysLeft: 5 }),
    },
    {
        label: 'Reminder 5 days before',
        generateSubject: (data) =>
            `⏳ ${data.subscriptionName} Renews in 5 Days – Stay Subscribed!`,
        generateBody: (data) => generateEmailTemplate({ ...data, daysLeft: 5 }),
    },
    {
        label: '2 days before reminder',
        generateSubject: (data) => `🚀 2 Days Left!  ${data.subscriptionName} Subscription Renewal`,
        generateBody: (data) => generateEmailTemplate({ ...data, daysLeft: 2 }),
    },
    {
        label: 'Reminder 2 days before',
        generateSubject: (data) => `🚀 2 Days Left!  ${data.subscriptionName} Subscription Renewal`,
        generateBody: (data) => generateEmailTemplate({ ...data, daysLeft: 2 }),
    },
    {
        label: '1 days before reminder',
        generateSubject: (data) => `⚡ Final Reminder: ${data.subscriptionName} Renews Tomorrow!`,
        generateBody: (data) => generateEmailTemplate({ ...data, daysLeft: 1 }),
    },
    {
        label: 'Reminder 1 days before',
        generateSubject: (data) => `⚡ Final Reminder: ${data.subscriptionName} Renews Tomorrow!`,
        generateBody: (data) => generateEmailTemplate({ ...data, daysLeft: 1 }),
    },
    {
        label: 'Reminder 0 days before',
        generateSubject: (data) => `🎯 ${data.subscriptionName} Renews TODAY!`,
        generateBody: (data) => generateEmailTemplate({ ...data, daysLeft: 0 }),
    },
];
