import { useEffect, useState } from "react";
import {
  FormContainer,
  FormInput,
  Button,
  Dropdown,
  RichtextEditor,
} from "../../../components/index";
import { getAllCategories } from "../../../services/adminService";
export default function ProductCreatingPage() {
  const [categories, setCategories] = useState([]);
  const [richTextValue, setRichTextValue] = useState({});
  function onEditorsChange(key, value) {
    setRichTextValue((previousData) => {
      return { ...previousData, [key]: value };
    });
  }

  const colors = [
    "Color 1",
    "Color 2",
    "Color 3",
    "Color 4",
    "Color 5",
    "Color 6",
  ];

  useEffect(() => {
    const fetchCategories = async () => {
      let response = await getAllCategories(
        "http://localhost:8080/api/v1/admin/categories"
      );
      setCategories(response.data.map((el) => el.categoryName));
    };
    fetchCategories();
  }, []);
  const handleSelect = (option) => {
    console.log("Selected option:", option);
  };
  return (
    <div>
      <FormContainer title="Create a new product">
        <div className="rethink__form-control">
          <Dropdown
            options={categories}
            onSelect={handleSelect}
            label="Propduct category"
          />
        </div>
        <div className="rethink__form-control">
          <Dropdown
            options={colors}
            onSelect={handleSelect}
            label="Product color"
          />
        </div>
        <FormInput id="brand" placeholder="Product Brand" />
        <FormInput id="name" placeholder="Product Name" />
        <FormInput type="number" id="price" placeholder="Product Price" />
        <FormInput label="Product Images" type="file" id="images" multiple />
        <div className="rethink__form-control">
          <span className="label">Description</span>
          <RichtextEditor id="description" />
        </div>
        <div className="rethink__form-control">
          <span className="label">Details</span>
          <RichtextEditor id="details" />
        </div>
        <div className="rethink__form-control">
          <span className="label">Shipping/Return</span>
          <RichtextEditor id="shipping-return" />
        </div>
        <Button label="Create" />
      </FormContainer>
    </div>
  );
}
