import React from 'react';
import PropTypes from 'prop-types';
import { Input } from 'reactstrap';
import { Button, FormLabel } from '@chakra-ui/react';

function OptionChooser({ handleShowQRCode }) {
    return (
        <>
            <div className='d-flex justify-content-center align-items-center'>
                <span className='ms-5 me-5' style={{ fontWeight: "550" }}>Locally</span>
                <Input size='sm' type='file' className='me-5' />
            </div>
            <FormLabel textAlign='center' className='mt-3 mb-3'>OR</FormLabel>
            <div className='d-flex justify-content-center align-items-center'>
                <span className='me-5' style={{ fontWeight: "550" }}>Using SmartScan</span>
                <Button size='sm' color='white' backgroundColor='#68b4db' _hover={{ backgroundColor: "#68b4db" }} onClick={handleShowQRCode}>Show QR Code</Button>
            </div>
        </>
        // <div id='optionchooser'>
        //     <div className="input-group mb-4 ps-5 pe-5">
        //         <input type="file" className="form-control" id="inputGroupFile02" />
        //     </div>
        //     <label>OR</label>
        //     <div className='ps-5 pe-5 mt-4'>
        //         <label className='me-5'>Using SmartScan</label>
        //         <input className=' ms-5 btn btn-info' type='button' value='Show QR Code' onClick={handleShowQRCode} />
        //     </div>
        // </div>
    );
}

OptionChooser.propTypes = {
    handleShowQRCode: PropTypes.func.isRequired,
};

export default OptionChooser;