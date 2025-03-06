import "./_product-Information.scss";
import NumberInput from "../NumberField/NumberInput";
import RethinkTabs from "../Tabs/Tabs";
import SelectedItem from "../SelectedItem/SelectedItem";
import ProductColor from "../ProductColor/ProductColor";
const tabs = [
  {
    tabTitle: "Description",
    tabContent:
      "The comfiest wardrobe staple, designed with our favorite ultra-soft jersey fabric. This straight-leg pant style features a stretch waistband making it comfortable to wear all day long! Wear it as a set with our Remy t-shirt for an easy travel ootd!",
  },
  {
    tabTitle: "Details",
    tabContent: `<div id="tab-2" style="">
<p><meta charset="utf-8">Material :&nbsp;90% Polyester, 10% Elastane</p>
<p>Size : S, M, L, XL</p>
<p>Measurement :</p>
<p><strong>Size Small</strong></p>
<ul>
<li>Waist : 60-76 cm</li>
<li>Hip : 88-100 cm</li>
<li>Length : 97 cm</li>
<li>Thigh Circumference : 56 cm</li>
<li>Front Rise : 30 cm</li>
<li>Back Rise : 37 cm</li>
</ul>
<p><strong>Size Medium</strong></p>
<ul>
<li>Waist : 66-82 cm</li>
<li>Hip : 92-104 cm</li>
<li>Length : 98 cm</li>
<li>Thigh Circumference : 58 cm</li>
<li>Front Rise : 30 cm</li>
<li>Back Rise : 38 cm</li>
</ul>
<p><strong>Size Large</strong></p>
<ul>
<li>Waist : 70-86 cm</li>
<li>Hip : 96-108 cm</li>
<li>Length : 98 cm</li>
<li>Thigh Circumference : 60 cm</li>
<li>Front Rise : 30 cm</li>
<li>Back Rise : 38 cm</li>
</ul>
<p><strong>Size&nbsp;XL</strong></p>
<ul>
<li>Waist : 76-92 cm</li>
<li>Hip : 102-114 cm</li>
<li>Length : 99 cm</li>
<li>Thigh Circumference : 62 cm</li>
<li>Front Rise : 30 cm</li>
<li>Back Rise : 39 cm</li>
</ul>
<p>Kindly note that all measurements are subjected to 1 - 2 cm allowance difference.</p>
<p><meta charset="utf-8"><strong data-mce-fragment="1">CARE INSTRUCTIONS :&nbsp;</strong></p>
<ul>
<li>HANDWASH COLD OR MACHINE WASH COLD</li>
<li>DO NOT BLEACH</li>
<li>TUMBLE DRY LOW</li>
<li>COOL IRON</li>
</ul>
</div>`,
  },
  {
    tabTitle: "Shipping/Returns",
    tabContent: `<p><strong>SHIPPING</strong></p>
<p>Ready Stock Items are generally dispatched within 1 - 3&nbsp; days after receipt of payment and are shipped via selected courier. We will provide you with a link to track your package online. Please note that delivery will only be performed on working days.<br><br>Preorder Items are generally dispatched within the given preorder period provided in the product description box.<br><br>Shipping fees include handling and packing fees as well as postage costs. Handling fees are fixed, whereas transport fees vary according to total weight of the shipment. We advise you to group your items in one order. We cannot group two distinct orders placed separately, and shipping fees will apply to each of them. Your package will be dispatched at your own risk, but special care is taken to protect fragile objects.<br><br>Import duties will be borne by the customer, with the amount varies according to the import tax regulation in the countries the recipient resides in.</p>
<p><strong>RETURNS</strong></p>
<p>We only offer and accept refunds in form of STORE CREDIT at the selling price of the returned products.Refunds will not include shipping costs. Store credit only can be used in&nbsp;1 TRANSACTION ONLY within 6 MONTHS&nbsp;period since the store credit&nbsp;ACTIVATED.&nbsp;</p>
<p>For international customers, please contact your local customs for more details on tax and custom refund.</p>
<p><strong>EXCHANGES</strong></p>
<p>Products must be mailed for return&nbsp;within 10 days from the day the order was delivered.(i.e. Your order was arrived 8th April, you have until 18st April to ship back your returns). Products must be unworn and unwashed. Products must have Duma Official tag attached.</p>
<p><strong>IMPORTANT NOTE :</strong><br></p>
<p>Please note that : Accessories (Bags, Earrings, Necklace, Body Jewelry) Sale, Sleepwear, Intimates, Sportswear are final sale. Due to hygiene reasons they are strictly not qualified for returns or exchanges.<br><br>Any product marked and included in "SALE / DISCOUNT" promotion cannot be exchange nor return.</p>`,
  },
];

const sizes = ["Size 0", "Size 1", "Size 2", "Size 3"];
const colorOptions = [
  { name: "Black", color: "#000000" },
  { name: "Lavender", color: "#B497D6" },
  { name: "Peach", color: "#FFB8A9" },
  { name: "Sky Blue", color: "#87CEEB" },
  { name: "Sunset", color: "#FF6347" },
];
export default function ProductInformation() {
  return (
    <div className="rethink-product-info">
      <div className="rethink-product-info__meta">
        <div className="brand-name heading">Rethink Official</div>
        <div className="product-name heading">
          Larra Pants Black | BACK IN STOCK
        </div>
        <div className="product-price">$35.69</div>
      </div>
      <div className="rethink-product-info__variants">
        <SelectedItem
          label="Size:"
          items={sizes}
          onSelectItem={(size) => console.log(size)}
        />
        <ProductColor
          colorOptions={colorOptions}
          onColorSelect={(color) => console.log(color)}
        />
        <div className="product-quantity">
          <NumberInput />
        </div>
      </div>
      <button className="add-to-card-btn">
        <span className="add-to-card-btn__label">Add to card</span>
      </button>
      <button className="wishlist-btn">
        <span className="wishlist-btn__label">Add to Wishlist</span>
      </button>
      <RethinkTabs tabs={tabs} className="ethink-product-info__description" />
    </div>
  );
}
