### Post `/api/admin/comments`
#### Request (JSON)
- **Headers**:
  - `Authorization` (string)
- **Form**:
    - **`commentText`** (string)
    - **`userId`** (string)

#### Response (JSON)
- **`status`**(number)
- **`message`**(string)
- **`data`**(object)
  - **`newComment`**(object)
    - **`commentText`**(string)
    - **`userId`**(string)
    - **`username`**(string)
    - **`createdAt`**(string)
    - **`updatedAt`**(string)
    - **`_id`**(string)
    - **`__v`**(integer)

---

### GET `/api/admin/comments`
#### Request
- **Headers**:
  - `Authorization` (string)
- **Query Parameters**:
  - `page` (integer)
  - `limit` (integer)
- **Body**:
  - `userId` (string)

#### Response (JSON)
- **`status`** (integer)
- **`message`** (string)
- **`data`** (object)
  - **`comments`** (array)
    - **`_id`** (string)
    - **`commentText`** (string)
    - **`userId`** (string)
    - **`username`** (string)
    - **`createdAt`** (string)
    - **`updatedAt`** (string)
    - **`__v`** (integer)

---

### DELETE `/api/admin/comments/{commentId}`
#### Request
- **Headers**:
  - `Authorization` (string)
- **Path Parameter:**
  - `commentId` (string)

#### Response (JSON)
- **`status`** (integer)
- **`message`** (string)

---
