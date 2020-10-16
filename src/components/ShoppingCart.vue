<template>
    <div>
        <div class="headerText"> Cart Summary </div>
        <p v-show="!products.length"><i>Please add some products to cart.</i></p>
        <!-- <ul>
            <li v-for="product in products" :key="product.id">
                {{product.title}} - {{product.price | currency}} - {{product.quantity}}
                <el-button 
                    type="primary" 
                    size="small"
                    plain
                    @click="removeProductFromCart(product)">
                    Remove 1
                </el-button>                 
            </li>
        </ul> -->

        <el-table v-show="products.length > 0"
            :data="products"
            style="width: 100%"
            size="small"
            >
            <el-table-column
                label="Item"
                >
                <template v-slot="scope">
                    {{ scope.row.title }}
                </template>
            </el-table-column>
            <el-table-column
                label="Price"
                >
                <template v-slot="scope">
                    {{ scope.row.price | currency }}
                </template>
            </el-table-column>
            <el-table-column
                label="Quantity"
                >
                <template v-slot="scope">
                    <div>
                        <!-- <el-button type="success" icon="el-icon-plus" 
                            @click='addToCart(scope.row.details)' size="mini">
                        </el-button> -->
                        <!-- <div class="inline">
                            <input type="text" autocomplete="off" 
                                class="el-input__inner" :value="scope.row.quantity"> 
                        </div> -->
                        <!-- <el-button type="danger" icon="el-icon-minus" 
                            @click='removeFromCart(scope.row.details.sku)' size="mini">
                        </el-button>                                         -->

                        {{scope.row.id}}
                        {{mapQuantities[scope.row.id]}}
                        {{quantities[scope.row.id]}}
                        {{scope.row.quantity}}

                        <!-- <el-input-number :value="scope.row.quantity"
                            size="mini"
                            @change="handleItemChange"
                            :ref="'item_' + scope.row.id"
                            :min="1" :max="10"></el-input-number>                         -->

                        <NumberInput 
                            :value="scope.row.quantity"
                            :key="scope.row.quantity"
                            :id="scope.row.id"
                            :min="0" :max="scope.row.quantity + scope.row.inventory"
                            @value-change="handleItemChange"
                        />

                        <!-- <input type="number" :value="scope.row.quantity"
                            size="mini" style="width: 50px;"
                            min="1" max="10" />                        -->
                    </div>
                </template>
            </el-table-column>   

            <!-- <el-table-column
                label="Operations">
                <template v-slot="scope">
                    <el-button
                        size="mini"
                        @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
                    <el-button
                        size="mini"
                        type="danger"
                        @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
                </template>
            </el-table-column> -->
        </el-table>        

        <p> Total: {{total | currency}} </p>

        <el-button type="primary" @click="cartCheckout()" :loading="processing"> Checkout</el-button>
        <p v-if="checkoutStatus">{{checkoutStatus}}</p>
    </div>
</template>

<script>
import {mapState, mapGetters, mapActions} from 'vuex'
import NumberInput from "@/components/NumberInput"

export default {
    components: {
        NumberInput,
    },    
    data() {
        return {
            processing: false,
            input: '',
            quantities: {},
        }
    },
    computed: {
        ...mapState('cart', {
            checkoutStatus: state => state.checkoutStatus,
        }),

        ...mapGetters('cart', {
            products: 'cartProducts',
            total: 'cartTotal',
            quantity: 'cartQuantity',
        }),

        mapQuantities() {
            this.products.forEach((product) => {
                if (product.id in this.quantities) {
                    return false;
                }
                this.quantities[product.id] = product.quantity 
            });
            return this.quantities;
        },        

        // products() {
        //     return this.$store.getters.cartProducts;
        // },
        // total() {
        //     return this.$store.getters.cartTotal;
        // }        
    }, 
    methods: {
        ...mapActions('cart', {
            checkout: 'checkout',
            removeProductFromCart: 'removeProductFromCart',
        }),
        async cartCheckout() {
            this.processing = true;
            let message = {
                title: 'Success!',
                type: 'success',
                message: `You have successfully purchased ${this.quantity} item${this.quantity == 1 ? '' : 's'}!`,
            }             
            if (this.products.length < 1) {
                message = {
                    title: 'Oops...',
                    type: 'info',
                    message: 'Please add some products to cart before checking out!',
                }  
            } else {
                try {
                    await this.checkout();
                } catch (e) {
                    message = {
                        title: 'Error!',
                        type: 'error',
                        message: 'Oh no, something went wrong... Please try again!',
                    }                
                }
            }   
            this.processing = false;
            this.$notify(message);  
        },

        handleItemChange(data) {
            //{currentValue, oldValue, id}
            console.log(data)
        }        
    }
}
</script>

<style scoped>
.center {
    display: flex;
    justify-content: center;
    align-items: center;    
} 

.inline {
    display: inline-block;
}
.headerText {
    vertical-align: top;
    display: inline;
}

.el-icon-plus {
    display: flex;
    justify-content: center;
    align-items: center;    
} 

.el-button--mini {
    height: 22px;
    width: 15px;
    text-align: center;
    font-size: 12px;
}

.el-input__inner {
    width: 40px;
    height: 30px;
    /* padding: 0 8px; */
    text-align: center;
}

.el-input-number--mini {
    width: 90px;
}
</style>