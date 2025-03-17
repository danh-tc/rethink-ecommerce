import Dropdown from "../../../components/Dropdown/Dropdown";

export default function CategoryCreatingPage() {
  const options = ["Option 1", "Option 2", "Option 3", "Option 4", "Option 5", "Option 6"];

  const handleSelect = (option) => {
    console.log("Selected option:", option);
  };
  return (
    <div>
      <Dropdown options={options} onSelect={handleSelect} />
    </div>
  );
}
