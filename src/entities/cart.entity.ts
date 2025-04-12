import { Entity, Column, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CartItemEntity } from './cart-item.entity';
import { CartStatuses } from 'src/cart';

@Entity({ name: 'carts' })
export class CartEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid', nullable: false })
  user_id: string;

  @Column({ type: 'date' })
  created_at: number;

  @Column({ type: 'date' })
  updated_at: number;

  @Column({ type: 'enum', enum: CartStatuses, nullable: false })
  status: CartStatuses;

  @OneToMany(() => CartItemEntity, (cartItem) => cartItem.cart, {
    cascade: true,
  })
  cartItems: CartItemEntity[];
}
