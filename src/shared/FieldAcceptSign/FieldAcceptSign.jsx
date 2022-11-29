import SVGCreator from "../../shared/components/SVGCreator";

const FieldAcceptSign = ({ markStyles }) => {
  return (
    <div className={markStyles}>
      <SVGCreator iconName="checkmark" width={16} height={16} />
    </div>
  );
};

export default FieldAcceptSign;
