<!-- 
// ============================================================================
//    Author: Kenneth Perkins
//    Date:   Oct 13, 2020
//    Taken From: http://programmingnotes.org/
//    File:  ShoppingCart.vue
//    Description: Shopping cart that processes final quantities and payment 
// ============================================================================ 
-->
<template>
    <section>
        <div class="header-text"> {{title}} </div>
        <p v-show="!products.length"><i>Please add some products to cart.</i></p>

        <div :style="isCheckout ? 'margin: auto; overflow: auto;' : ''">
            <el-table v-show="products.length > 0"
                :data="products"
                :key="products.length"
                style="width: 100%"
                :size="isCheckout ? '' : 'small'"
                >
                <el-table-column
                    label="Item"
                    :width="isCheckout ? '' : 90"
                    >
                    <template v-slot="scope">
                        {{ scope.row.title }}
                    </template>
                </el-table-column>
                <el-table-column
                    label="Price"
                    :width="isCheckout ? '' : 80"
                    >
                    <template v-slot="scope">
                        {{ scope.row.price | currency }}
                    </template>
                </el-table-column>
                <el-table-column
                    label="Quantity"
                    :width="isCheckout ? '' : 100"
                    >
                    <template v-slot="scope">
                        <div :class="isCheckout ? '' : 'center'">
                            <NumberInput 
                                :value="scope.row.quantity"
                                :key="scope.row.quantity"
                                :id="scope.row.id"
                                :size="isCheckout ? 'mini' : 'mini'"
                                :min="0" :max="scope.row.quantity + scope.row.inventory"
                                @value-change="handleItemChange"
                            />
                        </div>
                    </template>
                </el-table-column>  
            </el-table>        
        </div>
        
        <p> Total: {{total | currency}} </p>

        <div v-if="isCheckout">
            <el-button v-show="products.length > 0" plain @click="cartClear()"> Clear Cart</el-button>

            <el-button type="primary" @click="cartCheckout()" :loading="processing"> Checkout</el-button>
        </div>
        
        <!-- <p v-if="checkoutStatus">{{checkoutStatus}}</p> -->
    </section>
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
    props: {
        isCheckout: {
            type: Boolean,
            required: false,
            default: false
        }, 
        title: {
            type: String,
            required: false,
            default: 'Cart Summary'
        },             
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
            let cancelClear = await this.verifyClear();
            if (cancelClear) {
                return;
            }
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
                let cancelRemove = await this.verifyRemoval(data.id);
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

        async verifyClear() {
            let cancelClear = true;
            try {
                await this.$confirm(`Are you sure you want to clear the cart?`, 'Clear Cart?', {
                    confirmButtonText: 'Cancel',
                    cancelButtonText: `Yes, Clear Cart`, 
                    type: 'warning',
                    closeOnClickModal: false,
                    closeOnPressEscape: false,
                    confirmButtonClass: 'el-button',
                    cancelButtonClass: 'el-button--danger',
                    showClose: false,
                });
            } catch (e) {
                cancelClear = false;
            }
            return cancelClear;
        },        

        async verifyRemoval(itemId) {
            let product = this.getItem(itemId);
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

<style>
.el-table .cell {
    padding-left: 2px!important;
} 
</style>