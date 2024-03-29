const BASE_URL= process.env.REACT_APP_BASE_URL;

export async function loader({ request: { signal }} : { request: { signal: AbortSignal } }) {
    try {
        const response = await fetch(`${BASE_URL}/api/user/get`, {
          signal,
          credentials: "include",
        });
  
        if (response.status !== 200) {
          return null;
        }
  
        const data = await response.json();
        
        return { user : data.user };
    } catch (error: any) {
        if (error.name === "AbortError") {
          return;
        }
        return null;
    }
  }