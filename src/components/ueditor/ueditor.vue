<template>
    <div ref="editor"></div>
</template>

<script>
    //http://stackoverflow.com/questions/6860853/generate-random-string-for-div-id
    function guidGenerator() {
        var S4 = function () {
            return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
        };
        return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
    }

    //<ueditor v-model="str" :config="config"></ueditor>
    const UE = require('components/ueditor/ueditor/index.js').default
    module.exports = {
        props: {
            value: {
                type: String,
                default: null
            },
            config: {
                type: Object,
                default: function () {
                    return {
                        //这里可以选择自己需要的工具按钮名称,此处仅选择如下五个
                        toolbars: [[ 'source', '|', 'undo', 'redo', '|',
        'bold', 'italic', 'underline', 'fontborder', 'strikethrough', 'superscript', 'subscript', 'removeformat', 'formatmatch', 'autotypeset', 'blockquote', 'pasteplain', '|', 'forecolor', 'backcolor', 'insertorderedlist', 'insertunorderedlist', 'selectall', 'cleardoc', '|',
        'rowspacingtop', 'rowspacingbottom', 'lineheight', '|',
        'customstyle', 'paragraph', 'fontfamily', 'fontsize', '|',
        'directionalityltr', 'directionalityrtl', 'indent', '|',
        'justifyleft', 'justifycenter', 'justifyright', 'justifyjustify', '|', 'touppercase', 'tolowercase', '|']],
                        //
                        autoHeightEnabled: true,
                        initialFrameHeight: 350,
                        //focus时自动清空初始化时的内容
                        autoClearinitialContent: true,
                        //tel
                        allowLinkProtocols: ['tel:'],
                        //关闭字数统计
                        wordCount: false,
                        //关闭elementPath
                        elementPathEnabled: false
                    }
                }
            }
        },
        data() {
            return {
                isReady: false,
                isInit: false
            }
        },        
        mounted() {
             
            this.$nextTick(function () {
                // 保证 this.$el 已经插入文档
                const id = guidGenerator()

                this.$refs.editor.id = id;
                this.editor = UE.getEditor(id, this.config)
                this.editor.ready(() => {
                        this.editor.addListener("contentChange", () => {
                            const content = this.editor.getContent()
                            this.$emit('input', content)
                        })
                        this.editor.setContent(this.value);

                        this.$emit('ready', this.editor)
                        this.isReady = true
                    })
                
                
            })
        },
        methods: {
            setContent(value) {
                if (this.isReady && value) {
                    this.editor.setContent(value)
                }
            }
        },
        watch: {
            value(val) {
                if (val && this.isReady && !this.isInit && val !== this.editor.getContent()) {
                    this.editor.setContent(val)
                    this.isInit = true
                }
            }
        },
        beforeDestroy() {
            this.editor.destroy()
        }
    }
</script>