<template>
    <span>
        <el-input-number v-model="dataValue"
            :size="size"
            @change="handleChange"
            :min="min" :max="max"></el-input-number>         
    </span>
</template>

<script>
export default {
    data() {
        return {
            dataValue: this.value,
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
    },
    methods: {
        handleChange(currentValue, oldValue) {
            this.$emit('value-change', {
                currentValue, 
                oldValue,
                id: this.id,
            })
        }        
    }
}
</script>

<style scoped>
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