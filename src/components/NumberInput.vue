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
                    min: this.min,
                    max: this.max,
                    id: this.id,
                    setValue: this.setValue,
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
            } catch(e) {
                +e;
            } finally {
                this.update();
            }           
        },
        setValue(value) {
            this.dataValue = value;
        },
        update() {
            this.componentKey++;
        }        
    }
}
</script>

<style scoped>
.el-input-number--mini .el-input-number__decrease, 
.el-input-number--mini .el-input-number__increase {
    width: 24px;
    font-size: 12px;
}

.el-input__inner {
    width: 30px;
    height: 30px;
    text-align: center;
}
.el-input-number--mini {
    width: 92px;
}
</style>