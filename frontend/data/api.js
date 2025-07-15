const base_url = "http://localhost:3001"


export const get = async (url, headers = {}) => {
  try {
    const res = await fetch(base_url+url, {
      method: 'GET',
      headers,
    });

    const data = await res.json();
    return {
      ok: res.ok,
      status: res.status,
      data,
      message: data?.message || '',
    };
  } catch (err) {
    return { ok: false, error: err.message || 'Unexpected error' };
  }
};

export const post = async (url, body, headers = {}) => {
  try {
    const isFormData = body instanceof FormData;

    const res = await fetch(base_url+url, {
      method: 'POST',
      headers: isFormData
        ? headers // لا ترسل Content-Type مع FormData
        : {
            'Content-Type': 'application/json',
            ...headers,
          },
      body: isFormData ? body : JSON.stringify(body),
    });

    const data = await res.json();

    return {
      ok: res.ok,
      status: res.status,
      data,
    };
  } catch (err) {
    return { ok: false, error: err.message || 'Unexpected error' };
  }
};

export const put = async (url, body, headers = {}) => {
  try {
    const isFormData = body instanceof FormData;

    const res = await fetch(base_url+url, {
      method: 'PUT',
      headers: isFormData
        ? headers
        : {
            'Content-Type': 'application/json',
            ...headers,
          },
      body: isFormData ? body : JSON.stringify(body),
    });

    const data = await res.json();

    return {
      ok: res.ok,
      status: res.status,
      data,
      message: data?.message || '',
    };
  } catch (err) {
    return { ok: false, error: err.message || 'Unexpected error' };
  }
};


export const del = async (url, headers = {}) => {
  try {
    const res = await fetch(base_url+url, {
      method: 'DELETE',
      headers,
    });

    const data = await res.json();
    return {
      ok: res.ok,
      status: res.status,
      data,
      message: data?.message || '',
    };
  } catch (err) {
    return { ok: false, error: err.message || 'Unexpected error' };
  }
};
