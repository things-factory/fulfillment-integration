import { User } from '@things-factory/auth-base'
import { Domain } from '@things-factory/shell'
import { Column, CreateDateColumn, Entity, Index, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

@Entity()
@Index(
  'ix_distribution-centers_0',
  (fulfillmentCenters: FulfillmentCenters) => [fulfillmentCenters.domain, fulfillmentCenters.name],
  { unique: true }
)
export class FulfillmentCenters {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @ManyToOne(type => Domain)
  domain: Domain

  @Column()
  platform: string

  @Column({
    nullable: true
  })
  centerId: string

  @Column()
  countryCode: string

  @Column({
    nullable: true
  })
  status: string

  @Column()
  name: string

  @Column({
    nullable: true
  })
  accessInfo: string

  @Column({
    nullable: true
  })
  accessToken: string

  @Column({
    nullable: true
  })
  refreshToken: string

  @Column({
    nullable: true
  })
  account: string

  @Column({
    nullable: true
  })
  description: string

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @ManyToOne(type => User, {
    nullable: true
  })
  creator: User

  @ManyToOne(type => User, {
    nullable: true
  })
  updater: User
}
