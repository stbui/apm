# login

### list

```bash
POST /api/login HTTP/1.1
Content-Type: application/json
Authorization: Basic 7cd22002-27a7-4c5d-ba4d-a1c108a20eaf

{
    "username": "stbui",
    "password": "123456"
}
```

```json
{
    "hasActivePlan": true,
    "verificationToken": "123456",
    "specialOffer": null,
    "token": "123456",
    "id": 1,
    "organizationUrl": "stbui",
    "firstName": "stb",
    "isTrial": true,
    "email": "stbui@stbui.com",
    "created": 1592746402.0,
    "lastName": "ui",
    "isAdmin": false,
    "organizationRole": "Product Management",
    "trialDaysLeft": 13,
    "isVerified": false
}
```
