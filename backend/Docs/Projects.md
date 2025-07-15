### Post `/api/projects`
#### Request (form-data)
- **Headers**:
  - `Authorization` (string)
- **Form**:
    - **`title`** (string)
    - **`description`** (string)
    - **`timeToFinish`** (string)
    - **`client`** (string)
    - **`status`** (string)
    - **`category`** (string)
    - **`cost`** (string)
    - **`pic`** (file)

#### Response (JSON)
- **`status`**(number)
- **`message`**(string)
- **`data`**(object)
  - **`newProject`**(object)
    - **`title`**(string)
    - **`description`**(string)
    - **`pic`**(string)
    - **`timeToFinish`**(string)
    - **`client`**(string)
    - **`status`**(string)
    - **`cost`**(number)
    - **`timeSpend`**(string)
    - **`category`**(string)
    - **`_id`**(string)
    - **`__v`**(integer)

---

### GET `/api/projects`
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
  - **`projects`** (array)
    - **`_id`** (string)
    - **`title`** (string)
    - **`description`** (string)
    - **`pic`** (string)
    - **`status`** (string)
    - **`category`** (string)
    - **`client`** (string)
    - **`cost`** (integer)
    - **`timeSpend`** (string)
    - **`timeToFinish`** (string)
    - **`__v`** (integer)

---

### GET `/api/projects/{projectId}`
#### Request
- **Headers**:
  - `Authorization` (string)
- **Path Parameter:**
  - `projectId` (string)

#### Response (JSON)
- **`status`** (integer)
- **`message`** (string)
- **`data`** (object)
  - **`project`** (object)
    - **`_id`** (string)
    - **`title`** (string)
    - **`description`** (string)
    - **`pic`** (string)
    - **`status`** (string)
    - **`category`** (string)
    - **`client`** (string)
    - **`cost`** (integer)
    - **`timeSpend`** (string)
    - **`timeToFinish`** (string)
    - **`__v`** (integer)

---

### PUT `/api/projects/{projectId}`
#### Request (form-data)
- **Headers**:
  - `Authorization` (string)
- **Form**:
    - **`title`** (string)
    - **`description`** (string)
    - **`timeToFinish`** (string)
    - **`timeSpend`** (string)
    - **`client`** (string)
    - **`status`** (string)
    - **`category`** (string)
    - **`cost`** (string)
    - **`pic`** (file)

#### Response (JSON)
- **`status`** (integer)
- **`message`** (string)
- **`data`** (object)
  - **`project`** (object)
    - **`_id`** (string)
    - **`title`** (string)
    - **`description`** (string)
    - **`pic`** (string)
    - **`status`** (string)
    - **`category`** (string)
    - **`client`** (string)
    - **`cost`** (integer)
    - **`timeSpend`** (string)
    - **`timeToFinish`** (string)
    - **`__v`** (integer)

---

### DELETE `/api/projects/{projectId}`
#### Request
- **Headers**:
  - `Authorization` (string)
- **Path Parameter:**
  - `projectId` (string)

#### Response (JSON)
- **`status`** (integer)
- **`message`** (string)

---
