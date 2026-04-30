import "reflect-metadata";
import {
  Param,
  Body,
  Get,
  Post,
  Put,
  Delete,
  JsonController,
  Params,
  NotFoundError,
  BadRequestError,
} from "routing-controllers";
import { ProductDTO } from "../dto/Product";
import { MESSAGE_ERROR } from "../const/message-error.const";
import { ProductInterface } from "../interfaces/product.interface";

const seedProducts: ProductInterface[] = [
  {
    id: "trj-crd",
    name: "Tarjetas de Crédito",
    description: "Tarjeta de consumo bajo la modalidad de crédito",
    logo: "https://images.unsplash.com/photo-1556740749-887f6717d7e4?auto=format&fit=crop&w=600&q=80",
    date_release: "2025-01-01",
    date_revision: "2026-01-01",
  },
  {
    id: "cta-aho",
    name: "Cuenta de Ahorro",
    description: "Cuenta orientada al ahorro con disponibilidad inmediata",
    logo: "https://images.unsplash.com/photo-1579621970795-87facc2f976d?auto=format&fit=crop&w=600&q=80",
    date_release: "2025-02-15",
    date_revision: "2026-02-15",
  },
  {
    id: "cdt-inv",
    name: "CDT Inversión",
    description: "Producto de inversión a término con rentabilidad fija",
    logo: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=600&q=80",
    date_release: "2025-03-10",
    date_revision: "2026-03-10",
  },
];

@JsonController("/products")
export class ProductController {
  products: ProductInterface[] = [...seedProducts];

  @Get("")
  getAll() {
    return {
      data: [...this.products],
    };
  }

  @Get("/verification/:id")
  verifyIdentifier(@Param("id") id: number | string) {
    return this.products.some((product) => product.id === id);
  }

  @Get("/:id")
  getOne(@Param("id") id: number | string) {
    const index = this.findIndex(id);

    if(index === -1) {
      throw new NotFoundError(MESSAGE_ERROR.NotFound);
    }
    return this.products.find((product) => product.id === id);
  }

  @Post("")
  createItem(@Body({ validate:true }) productItem: ProductDTO) {
    
    const index = this.findIndex(productItem.id);

    if(index !== -1) {
      throw new BadRequestError(MESSAGE_ERROR.DuplicateIdentifier);
    }
    
    this.products.push(productItem);
    return {
      message: "Product added successfully",
      data: productItem,
    };
  }

  @Put("/:id")
  put(@Param("id") id: number | string, @Body() productItem: ProductInterface) {
    const index = this.findIndex(id);

    if(index === -1) {
      throw new NotFoundError(MESSAGE_ERROR.NotFound);
    }

    this.products[index] = {
      ...this.products[index],
      ...productItem,
    };
    return {
      message: "Product updated successfully",
      data: productItem,
    };
  }

  @Delete("/:id")
  remove(@Param("id") id: number | string) {
    const index = this.findIndex(id);

    if(index === -1) {
      throw new NotFoundError(MESSAGE_ERROR.NotFound);
    }
        
    this.products = [...this.products.filter((product) => product.id !== id)];
    return {
      message: "Product removed successfully",
    };
  }

  private findIndex(id: number | string) {
    return this.products.findIndex((product) => product.id === id);
  }

}
