import { CartItem, CartStatus } from '../types/marketplace';

/**
 * Represents the parameters to update the cart items.
 */
export interface AddOrUpdateCartItemsParams {
  /**
   * The uuid of the cart to be updated, target on the cart
   * being checked out  if cartId is not provided.
   */
  cartId?: string;

  /**
   * A list of cart items object, for each item,
   * if item id exists in the cart, overwrite the item price and quantity,
   * otherwise add new items to cart.
   */
  cartItems: CartItem[];
}

/**
 * Represents the parameters to remove the cart items.
 */
export interface RemoveCartItemsParams {
  /**
   * The uuid of the cart to be updated, target on the cart
   * being checked out if cartId is not provided.
   */
  cartId?: string;

  /**
   * A list of cart id, delete the cart item accordingly.
   */
  cartItemIds: string[];
}

/**
 * Represents the parameters to update the cart status.
 */
export interface UpdateCartStatusParams {
  /**
   * The uuid of the cart to be updated, target on the cart
   * being checked out if cartId is not provided.
   */
  cartId?: string;

  /**
   * Status of the cart.
   */
  cartStatus: CartStatus;

  /**
   * Extra info to the status.
   */
  statusInfo?: string;
}
