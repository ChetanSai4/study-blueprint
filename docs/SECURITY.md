# Study Blueprint — Security Architecture & Threat Mitigation

## 1. Security Principles

Study Blueprint adheres to Defense-in-Depth and zero-trust engineering standards:
1. **Google Identity as the Sole Identity Provider:** Eliminates risks of credential stuffing, password reuse, weak hashes, and insecure SMS OTP attacks.
2. **Strict Server-Side Authorization:** Every mutation and private record retrieval validates ownership (`user_id == current_user.id`) or admin privilege (`current_user.role == "admin"`).
3. **Pydantic Validation & NoSQL Injection Defense:** All incoming query parameters and JSON payloads pass through typed Pydantic models. MongoDB operator injection (`$gt`, `$ne`, etc.) is mitigated by rejecting unescaped operator dictionaries and parsing IDs through strict validation.
4. **Secure Cookies & Session Management:** Session tokens are transmitted via `HttpOnly`, `Secure` (in production), and `SameSite=Lax` cookies, neutralizing XSS session theft.

---

## 2. Threat Matrix & Mitigations

| Threat | Risk Level | Mitigation Strategy |
|---|---|---|
| **Identity Forgery** | High | Backend verifies Google ID tokens using Google's public keys via official libraries; token `aud`, `iss`, and `exp` claims are strictly validated. |
| **Privilege Escalation** | High | User roles default to `student`. User promotion is restricted to backend database administration or protected admin audit operations. |
| **Insecure Direct Object Reference (IDOR)** | High | Endpoints querying user-specific entities (`study_sessions`, `tasks`, `study_plans`) include `user_id: current_user.id` in the database query filter. |
| **NoSQL Injection** | Medium | BSON ObjectIds are cast via `ObjectId(str_id)` with try/except validation. User input is never concatenated directly into raw MongoDB command strings. |
| **Cross-Site Scripting (XSS)** | Medium | Next.js React JSX automatically escapes output strings. Content Security Policy (CSP) headers restrict executable script sources. |
| **Cross-Site Request Forgery (CSRF)** | Medium | Session cookies use `SameSite=Lax`. Sensitive POST/PUT/DELETE requests validate JSON content-type and custom headers. |
| **Sensitive Data Exposure** | Medium | Passwords do not exist. Google secrets and database URIs remain server-side only in `.env` and are never bundled into frontend client code. |
| **Denial of Service / Rapid Polling** | Medium | API rate limiting is enforced on authentication and session endpoints. |

---

## 3. Privacy & Compliance for Indian Students

- **Data Minimization:** We only collect Google name, email address, profile photo URL, and student-supplied academic details (board, university, branch, semester, study goals).
- **No Aadhaar / Financial Data:** The application does not collect Aadhaar numbers, phone numbers, or payment card information.
- **Account Deletion:** Students can request complete deletion of their account, study history, and saved notes from the Profile & Settings page.
