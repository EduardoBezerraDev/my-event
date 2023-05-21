import { Box, Button, Modal } from "@mui/material";
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
import style from "./style";
import { ModalCustomProps } from "./modal.interface";

const ModalCustom: React.FC<ModalCustomProps> = ({ configModal, onClose }) => {
    const { open, title, message } = configModal;

    const handleClose = () => {
        onClose()
    };

    return (
        <Modal open={open} onClose={handleClose} data-testId = "modal-custom">
            <Box sx={{ ...style(configModal), width: 400 }}>
                <h4>{title}</h4>
                <p>{message}</p>
                <p>
                    <Button
                        variant="outlined"
                        startIcon={<DoneOutlineIcon />}
                        style={{ float: "right" }}
                        onClick={handleClose}
                    >
                        Entendido
                    </Button>
                </p>
            </Box>
        </Modal>
    );
};

export default ModalCustom;
