### Post `/api/admin/login`
#### Request
- **Form**:
    - **`username`** (string)
    - **`password`** (string)

#### Response (JSON)
- **`status`**(number)
- **`message`**(string)
- **`data`**(object)
  - **`token`**(string)

---

### Post `/api/admin/register`
#### Request (form-data)
- **Headers**:
  - `Authorization` (string)
- **Form**:
    - **`username`** (string)
    - **`email`** (string)
    - **`password`** (string)
    - **`role`** (string)
    - **`pic`** (file)
    - **`nickname`** (string)

#### Response (JSON)
- **`status`**(number)
- **`message`**(string)

---

### Post `/api/admin/logout`
#### Request
- **Headers**:
  - `Authorization` (string)

#### Response (JSON)
- **`status`**(number)
- **`message`**(string)

---