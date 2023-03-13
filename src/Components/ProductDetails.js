import { useContext, useState } from "react";
import {
  Card,
  Form,
  FormControl,
  FormGroup,
  FormLabel,
  Row,
  Col,
  Button,
} from "react-bootstrap";
import CartContext from "./Cart-Context";
import classes from "./ProductDetails.module.css";

const ChoclateDetails = (props) => {
  const CartCntx=useContext(CartContext)
  // const CandyName = useRef();
  // const description = useRef();
  // const Price = useRef();

  //    const handle = () => {
  //     console.log(CandyName.current.value); //to show on console
  //   };
  const [candyName, setCandyName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");

  const CandyHandler = (event) => {
    setCandyName(event.target.value);
  };
  const DescriptionHandler = (event) => {
    setDescription(event.target.value);
  };
  const PriceHandler = (event) => {
    setPrice(event.target.value);
  };
  const SubmitHandler=(e)=>{
e.preventDefault(); 
const ItemList = {
    
      candyName,
      description,
      price,
      quantity: 1,
    };
    let CurrentItem = false; //CurrentItem nothing but exixsting item
    const ModifiedCart = CartCntx.updateDetails.map((item) => {
      if (item.candyName===ItemList.candyName) {
       item.quantity+=1;
        CurrentItem = true;

        const Email = true;
    const userEmail = Email ? "tejachintu207gmailcom" : "tejachintu";
    
        fetch(
          `https://crudcrud.com/api/c0cb372a8f3b40188d787545ff64af48/${userEmail}/${item._id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              
              quantity: item.quantity,
            }),
          }
        )
          .then((response) => {
            if (!response.ok) {
              throw new Error("Failed to update item in cart");
            }
          })
          .catch((error) => console.error(error));
      }
      return item;
    });
      if (!CurrentItem) {
        ModifiedCart.push(ItemList);
      
        const Email = true;
        const userEmail = Email ? "tejachintu207gmailcom" : "tejachintu";
  fetch(
    `https://crudcrud.com/api/c0cb372a8f3b40188d787545ff64af48/${userEmail}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(ItemList),
    }
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to add item to cart");
      }
    })
    .catch((error) => console.error(error));
   }

      CartCntx.setUpdateDetails(ModifiedCart);
      
      
  
  
// props.onAdd(candyName, description, price);
      
      setCandyName("");
      setDescription("");
      setPrice("");
    }


  
  return (
    <Card>
      <Card.Body className={classes.label}>
        <Form   onSubmit={SubmitHandler}>
          <Row>
            <Col>
              <FormGroup className="mb-3 ">
                <FormLabel style={{color:"white" }}>CandyName</FormLabel>
                <FormControl
                  type="text"
                  placeholder="Candy"
                  onChange={CandyHandler}
                  value={candyName}
                 required 
                />
              </FormGroup>
            </Col>
            <Col>
              <FormGroup className="mb-3">
                <FormLabel style={{color:"white" }}>Description</FormLabel>
                <FormControl
                  type="text"
                  placeholder="Description"
                  onChange={DescriptionHandler}
                  value={description} required 
                />
              </FormGroup>
            </Col>
            <Col>
              {" "}
              <FormGroup className="mb-3">
                <FormLabel style={{color:"white" }}>Price</FormLabel>
                <FormControl
                  type="number"
                  placeholder="price"
                  onChange={PriceHandler}
                  value={price} required 
                />
              </FormGroup>
            </Col>
          </Row>
          <div>
            <Button type="submit" className="btn-dark btn-outline-success"           
      >
              Add Candy
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
};
export default ChoclateDetails;
