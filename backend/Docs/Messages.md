### GET `/api/admin/messages`
#### Request
- **Headers**:
  - `Authorization` (string)
- **Query Parameters**:
  - `page` (integer)
  - `limit` (integer)

#### Response (JSON)
- **`status`** (integer)
- **`message`** (string)
- **`data`** (object)
  - **`messages`** (array)
    - **`_id`** (string)
    - **`name`** (string)
    - **`email`** (string)
    - **`phoneNumber`** (string)
    - **`title`** (string)
    - **`knownBy`** (string)
    - **`requestedServices`** (string)
    - **`createdAt`** (string)
    - **`updatedAt`** (string)
    - **`__v`** (integer)

---

### DELETE `/api/admin/messages/{messagetId}`
#### Request
- **Headers**:
  - `Authorization` (string)
- **Path Parameter:**
  - `commentId` (string)

#### Response (JSON)
- **`status`** (integer)
- **`message`** (string)

---
