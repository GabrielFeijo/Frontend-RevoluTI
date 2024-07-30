import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from './ui/alert-dialog';

type ConfirmModalProps = {
    showConfirmModal: boolean;
    setShowConfirmModal: React.Dispatch<React.SetStateAction<boolean>>;
    handleDeleteHistoryItem: () => void;
};

const ConfirmModal = ({
    showConfirmModal,
    setShowConfirmModal,
    handleDeleteHistoryItem,
}: ConfirmModalProps) => {
    return (
        <AlertDialog open={showConfirmModal} onOpenChange={setShowConfirmModal}>
            <AlertDialogContent className='max-w-md'>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Você tem certeza absoluta?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        Esta ação não pode ser desfeita. Isso excluirá
                        permanentemente o endereço da sua lista de histórico.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDeleteHistoryItem}>
                        Continuar
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default ConfirmModal;
