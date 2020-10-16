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
.el-input__inner {
    width: 40px;
    height: 30px;
    text-align: center;
}
.el-input-number--mini {
    width: 90px;
}
</style>