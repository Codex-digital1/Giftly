import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const Success = () => {
    const { tranId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        Swal.fire({
            title: 'Success',
            text: `Payment successful for transaction ID: ${tranId}`,
            icon: 'success',
            confirmButtonText: 'OK'
        }).then(() => {
            navigate('/');  // Redirect to home page after clicking OK
        });
    }, [tranId, navigate]);

    return (
        <div>
          <p></p>
        </div>
    );
};

export default Success;
