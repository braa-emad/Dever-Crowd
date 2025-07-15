### Get /api/admin/tasks
#### Request
- **Headers**:
  - `Authorization` (string)
- **Query Parameters**:
  - `page` (integer)
  - `limit` (integer)

#### Response (JSON)
  - **`status`** (number)
  - **`message`** (string)
- **`data`** (object)
  - **`Tasks`** (array)
    - **`title`**(text)
    - **`assignedTo`**(array)
    - **`type`**(text)
    - **`deadline`**(text)
    - **`status`**(text)
    - **`references`**(text)
    - **`priority`**(number)
    - **`CreatedAt`**(text)
    - **`updatedAt`** (text)
    - **`_id`**(text)
    - **`__v`**(number)

---

  
### Post /api/admin/tasks
#### Request (JSON)
- **Headers**:
  - `Authorization` (string)
- **FORM**:
  - **`title`** (text)
  - **`description`** (text)
  - **`deadline`** (text)
  - **`assignedTo`** (array)
  - **`status`** (text)
  - **`references`** (text)
  - **`type`** (text)
  - **`priority`** (text)
  
#### Response (JSON)
- **`status`** (number)
- **`message`** (string)
- **`data`** (object)
  - **`newTask`** (object)
    - `title` (string)
    - `description` (string)
    - `assignedTo` (array of strings)
    - `type` (string)
    - `deadline` (string)
    - `status` (string)
    - `references` (string)
    - `priority` (string)
    - `createdAt` (string)
    - `updatedAt` (string)
    - `_id` (string)
    - `__v` (number)

---

### PUT /api/admin/tasks/{taskId}
#### Request (JSON)
- **Path Parameter:**
  - `taskId` (string)
- **Headers**
  - `Authorization` (string)
- **FORM**:
  - `title` (string)
  - `description` (string)
  - `deadline` (string)
  - `assignedTo` (array of strings)
  - `status` (string)
  - `references` (string)
  - `type` (string)
  - `priority` (string)

#### Response (JSON)
- **`status`** (number)
- **`message`** (string)
- **`data`** (object)
  - **`updatedTask`** (object)
    - `title` (string)
    - `description` (string)
    - `assignedTo` (array of strings)
    - `type` (string)
    - `deadline` (string)
    - `status` (string)
    - `references` (string)
    - `priority` (string)
    - `createdAt` (string)
    - `updatedAt` (string)
    - `_id` (string)
    - `__v` (number)
  
---

### Delete /api/admin/tasks/{taskId}
#### Request (JSON)
- **Path Parameter:**
  - `taskId` (string)
- **Headers**
  - `Authorization` (string)
  
#### Response (JSON)
- **`status`** (number)
- **`message`** (string)

---