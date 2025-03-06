import { Gallery, ProductInformation } from "../components/index";
import "./_productdetail.scss";

const slides = [
  "https://dumaofficial.com/cdn/shop/files/LarraPantsBlack_600x.jpg?v=1700777851",
  "https://dumaofficial.com/cdn/shop/files/LarraPantsBlack-2_600x.jpg?v=1700777851",
  "https://dumaofficial.com/cdn/shop/files/LarraPantsBlack-3_600x.jpg?v=1700777851",
  "https://dumaofficial.com/cdn/shop/files/LarraPantsBlack-4_600x.jpg?v=1700777851",
  "https://dumaofficial.com/cdn/shop/files/LarraPantsBlack-5_600x.jpg?v=1700777851",
];

export default function ProductDetailPage() {
  return (
    <>
      <div className="rethink-product-detail-container">
        <Gallery slides={slides} />
        <ProductInformation />
      </div>
      <div style={{ height: 500 }}>placeholder</div>
    </>
  );
}
