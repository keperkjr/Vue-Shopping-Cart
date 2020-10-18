<template>
    <span>
        <el-input-number v-model="dataValue"
            :size="size"
            @change="handleChange"
            :key="componentKey"
            :min="min" :max="max"></el-input-number>         
    </span>
</template>

<script>
export default {
    data() {
        return {
            dataValue: this.value,
            componentKey: 0,
        }
    },
    props: {
        value: {
            type: Number,
            required: true,
        },
        min: null,
        max: null,
        id: null,
        size: {
            type: String,
            default: "mini"
        },
        onMin: {
            type: Function,
            default: null
        },
        onMax: {
            type: Function,
            default: null
        }
    },
    methods: {
        handleChange(currentValue, oldValue) {
            try {
                let payload = {
                    currentValue, 
                    oldValue,
                    id: this.id,
                    reject: false,
                };
                
                // if (this.min != null && this.onMin) {
                //     if (currentValue <= this.min) {                    
                //         let result = this.onMin.call(this, payload);
                //         if (result != null && !result) {
                //             this.dataValue = oldValue;
                //             return; 
                //         }
                //     }
                // }
                // if (this.max != null && this.onMax) {
                //     if (currentValue >= this.max) {                    
                //         let result = this.onMax.call(this, payload);
                //         if (result != null && !result) {
                //             this.dataValue = oldValue;
                //             return; 
                //         }
                //     }
                // }
                
                this.$emit('value-change', payload);
                if (payload.reject) {
                    this.dataValue = oldValue;
                } 
            } catch(e) {
                +e;
            } finally {
                this.update();
            }           
        },
        update() {
            this.componentKey++;
        }        
    }
}
</script>

<style scoped>
.el-input__inner {
    width: 40px;
    height: 30px;
    text-align: center;
}
.el-input-number--mini {
    width: 90px;
}
</style>