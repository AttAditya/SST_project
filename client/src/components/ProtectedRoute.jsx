const { useState } = require("react");
const { VerifyLogin } = require("../api/users");
const { useNavigate } = require("react-router-dom");

function ProtectedRoute({ children }) {
    let [verified, setVerified] = useState(false);
    let navigate = useNavigate();

    let verifyLogin = async () => {
        if (localStorage.getItem('auth_token')) {
            let verification = await VerifyLogin();

            if (verification.data.success) {
                setVerified(true);
                return;
            }
        }

        navigate('/login');
    }

    if (!verified) {
        verifyLogin();
    }
    
    return (
        <>
            {verified ? children : null}
        </>
    );
}

export default ProtectedRoute;