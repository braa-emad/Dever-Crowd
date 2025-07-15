### GET `/api/admin/profiles`
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
  - **`admins`** (array)
    - **`_id`** (string)
    - **`username`** (string)
    - **`role`** (string)
    - **`nickname`** (string)
    - **`tasksNumber`** (integer)
    - **`tasksDone`** (integer)
    - **`email`** (string)
    - **`pic`** (string)
    - **`tasks`** (array)
    - **`comments`** (array)
    - **`__v`** (integer)

---

### GET `/api/admin/profiles/{projectId}`
#### Request
- **Headers**:
  - `Authorization` (string)
- **Path Parameter:**
  - `projectId` (string)

#### Response (JSON)
- **`status`** (integer)
- **`message`** (string)
- **`data`** (object)
  - **`user`** (object)
    - **`_id`** (string)
    - **`username`** (string)
    - **`role`** (string)
    - **`nickname`** (string)
    - **`tasksNumber`** (integer)
    - **`tasksDone`** (integer)
    - **`email`** (string)
    - **`pic`** (string)
    - **`tasks`** (array)
    - **`comments`** (array)
    - **`__v`** (integer)

---