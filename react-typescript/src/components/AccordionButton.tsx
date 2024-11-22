import Button from './Button';

interface AccordionButtonProps {
    onClick: () => void;
}

const AccordionButton: React.FC<AccordionButtonProps> = ({ onClick }) => {
    return <Button onClick={onClick}> Select a city ⬇</Button>;
};

export default AccordionButton;