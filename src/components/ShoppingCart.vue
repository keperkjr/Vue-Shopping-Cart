<template>
    <div>
        <div class="header-text"> Cart Summary </div>
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
                width="90"
                >
                <template v-slot="scope">
                    {{ scope.row.title }}
                </template>
            </el-table-column>
            <el-table-column
                label="Price"
                width="80"
                >
                <template v-slot="scope">
                    {{ scope.row.price | currency }}
                </template>
            </el-table-column>
            <el-table-column
                label="Quantity"
                width="100"
                >
                <template v-slot="scope">
                    <div class="center">
                        <NumberInput 
                            :value="scope.row.quantity"
                            :key="scope.row.quantity"
                            :id="scope.row.id"
                            size="mini"
                            :min="0" :max="scope.row.quantity + scope.row.inventory"
                            :onMin="verifyRemoval"
                            @value-change="handleItemChange"
                        />
                    </div>
                </template>
            </el-table-column>  
        </el-table>        

        <p> Total: {{total | currency}} </p>

        <el-button type="primary" @click="cartCheckout()" :loading="processing"> Checkout</el-button>
        <!-- <p v-if="checkoutStatus">{{checkoutStatus}}</p> -->
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
            adjustQuantity: 'adjustQuantity',
            clear: 'clear',
        }),

        getItem(id) {
            return this.products.find((product) => product.id === id);
        },

        async cartClear() {
            await this.clear();
        },        

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

        async handleItemChange(data) {
            //{currentValue, oldValue, id}
            let showMessage = false;
            if (data.currentValue <= data.min) {         
                let cancelRemove = await this.verifyRemoval(data);
                if (cancelRemove) {
                    data.setValue(data.oldValue);
                    return; 
                }
                showMessage = true;
            }          
            let product = this.getItem(data.id);
            this.adjustQuantity({
                product,
                quantity: data.currentValue,
            });

            if (showMessage) {
                this.$message({
                    type: 'success',
                    message: `${product.title} removed from the cart!`
                }); 
            }           
        },

        async verifyRemoval(data) {
            let product = this.getItem(data.id);
            // let result = confirm(`Are you sure you want to remove ${product.title}?`);
            let cancelRemove = true;
            try {
                await this.$confirm(`Are you sure you want to remove ${product.title}?`, 'Remove Item?', {
                    confirmButtonText: 'Cancel',
                    cancelButtonText: `Remove ${product.title}`, 
                    type: 'warning',
                    closeOnClickModal: false,
                    closeOnPressEscape: false,
                    confirmButtonClass: 'el-button',
                    cancelButtonClass: 'el-button--danger',
                    showClose: false,
                });
            } catch (e) {
                cancelRemove = false;
            }
            return cancelRemove;
        }        
    }
}
</script>

<style scoped>
.inline {
    display: inline-block;
}
.header-text {
    vertical-align: top;
    display: inline;
}
</style>