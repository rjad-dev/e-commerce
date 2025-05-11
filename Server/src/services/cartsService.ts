import { cartItemExpiryDate } from "../config";
import { CartInterface, CartItemInterface } from "../interfaces";
import Model from "../models";
import { CartItemRepository, CartRepository } from "../repositories";

export class CartsService {
  private repository: CartRepository;
  private cartItemsRepository: CartItemRepository;
  constructor() {
    (this.repository = new CartRepository()),
      (this.cartItemsRepository = new CartItemRepository());
  }

  async create({ userId }: { userId: number }): Promise<CartInterface> {
    return this.repository.create({
      userId: userId,
    });
  }

  async findOne({ userId }: { userId: number }): Promise<CartInterface> {
    return this.repository.findOne({
      where: {
        userId: userId,
      },
    });
  }

  async findAllItems({
    cartId,
  }: {
    cartId: number;
  }): Promise<CartItemInterface[]> {
    return this.cartItemsRepository.findAll({
      where: {
        cartId: cartId,
      },
      include: [
        {
          model: Model.Product,
          as: "product"
        }
      ]
    });
  }

  async addItem({
    cartId,
    productId,
    quantity,
  }: {
    cartId: number;
    productId: number;
    quantity: number;
  }): Promise<CartItemInterface> {
    const cartItemExists = await this.cartItemsRepository.findOne({
      where: {
        productId,
        cartId
      }
    })

    const expiryDate = new Date(
      new Date().getTime() + cartItemExpiryDate * 24 * 60 * 60 * 1000
    );
    
    if(cartItemExists) {  
      await this.cartItemsRepository.updateOne({
        id: cartItemExists.id,
        input: {
          quantity: cartItemExists.quantity + quantity,
          expiryDate
        }
      });

      return cartItemExists;
    } else {
      const cartItem = await this.cartItemsRepository.create({
        quantity,
        productId,
        expiryDate,
        cartId
      })
    }
  }

  async  removeItem({itemId}: {itemId: number}): Promise<boolean> {
    await this.cartItemsRepository.deleteOne(itemId)

    return true
  }
}
