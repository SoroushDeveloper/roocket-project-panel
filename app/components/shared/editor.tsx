import {EditorProvider, useCurrentEditor} from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Hr from '@/app/components/shared/hr'
import React, {ReactElement} from 'react'

const MenuBar = () => {
    const {editor} = useCurrentEditor()

    if (!editor) {
        return null
    }

    return (
        <>
            <div className="grid gap-6 mb-2 md:grid-cols-7">
                <button type="button"
                        disabled={!editor.can().chain().focus().toggleBold().run()}
                        className={`${editor.isActive('bold') ? 'bg-gray-500 text-gray-100 dark:text-gray-900' : ''} rounded flex justify-center items-center bg-none border-2 border-gray-500 py-1 px-2 text-gray-500`}
                        onClick={() => editor.chain().focus().toggleBold().run()}>
                    Bold
                </button>
                <button type="button"
                        disabled={!editor.can().chain().focus().toggleItalic().run()}
                        className={`${editor.isActive('italic') ? 'bg-gray-500 text-gray-100 dark:text-gray-900' : ''} rounded flex justify-center items-center bg-none border-2 border-gray-500 py-1 px-2 text-gray-500`}
                        onClick={() => editor.chain().focus().toggleItalic().run()}>
                    Italic
                </button>
                <button type="button"
                        disabled={!editor.can().chain().focus().toggleStrike().run()}
                        className={`${editor.isActive('strike') ? 'bg-gray-500 text-gray-100 dark:text-gray-900' : ''} rounded flex justify-center items-center bg-none border-2 border-gray-500 py-1 px-2 text-gray-500`}
                        onClick={() => editor.chain().focus().toggleStrike().run()}>
                    Strike
                </button>
                <button type="button"
                        disabled={!editor.can().chain().focus().toggleCode().run()}
                        className={`${editor.isActive('code') ? 'bg-gray-500 text-gray-100 dark:text-gray-900' : ''} rounded flex justify-center items-center bg-none border-2 border-gray-500 py-1 px-2 text-gray-500`}
                        onClick={() => editor.chain().focus().toggleCode().run()}>
                    Code
                </button>
                <button type="button" onClick={() => editor.chain().focus().unsetAllMarks().run()}
                        className="rounded flex justify-center items-center bg-none border-2 border-gray-500 py-1 px-2 text-gray-500">
                    Clear marks
                </button>
                <button type="button" onClick={() => editor.chain().focus().clearNodes().run()}
                        className="rounded flex justify-center items-center bg-none border-2 border-gray-500 py-1 px-2 text-gray-500">
                    Clear nodes
                </button>
                <button type="button"
                        onClick={() => editor.chain().focus().setParagraph().run()}
                        className={`${editor.isActive('paragraph') ? 'bg-gray-500 text-gray-100 dark:text-gray-900' : ''} rounded flex justify-center items-center bg-none border-2 border-gray-500 py-1 px-2 text-gray-500`}
                >
                    Paragraph
                </button>
                <button type="button"
                        onClick={() => editor.chain().focus().toggleHeading({level: 1}).run()}
                        className={`${editor.isActive('heading', {level: 1}) ? 'bg-gray-500 text-gray-100 dark:text-gray-900' : ''} rounded flex justify-center items-center bg-none border-2 border-gray-500 py-1 px-2 text-gray-500`}
                >
                    H1
                </button>
                <button type="button"
                        onClick={() => editor.chain().focus().toggleHeading({level: 2}).run()}
                        className={`${editor.isActive('heading', {level: 2}) ? 'bg-gray-500 text-gray-100 dark:text-gray-900' : ''} rounded flex justify-center items-center bg-none border-2 border-gray-500 py-1 px-2 text-gray-500`}
                >
                    H2
                </button>
                <button type="button"
                        onClick={() => editor.chain().focus().toggleHeading({level: 3}).run()}
                        className={`${editor.isActive('heading', {level: 3}) ? 'bg-gray-500 text-gray-100 dark:text-gray-900' : ''} rounded flex justify-center items-center bg-none border-2 border-gray-500 py-1 px-2 text-gray-500`}
                >
                    H3
                </button>
                <button type="button"
                        onClick={() => editor.chain().focus().toggleHeading({level: 4}).run()}
                        className={`${editor.isActive('heading', {level: 4}) ? 'bg-gray-500 text-gray-100 dark:text-gray-900' : ''} rounded flex justify-center items-center bg-none border-2 border-gray-500 py-1 px-2 text-gray-500`}
                >
                    H4
                </button>
                <button type="button"
                        onClick={() => editor.chain().focus().toggleHeading({level: 5}).run()}
                        className={`${editor.isActive('heading', {level: 5}) ? 'bg-gray-500 text-gray-100 dark:text-gray-900' : ''} rounded flex justify-center items-center bg-none border-2 border-gray-500 py-1 px-2 text-gray-500`}
                >
                    H5
                </button>
                <button type="button"
                        onClick={() => editor.chain().focus().toggleHeading({level: 6}).run()}
                        className={`${editor.isActive('heading', {level: 6}) ? 'bg-gray-500 text-gray-100 dark:text-gray-900' : ''} rounded flex justify-center items-center bg-none border-2 border-gray-500 py-1 px-2 text-gray-500`}
                >
                    H6
                </button>
                <button type="button"
                        onClick={() => editor.chain().focus().toggleBulletList().run()}
                        className={`${editor.isActive('bulletList') ? 'bg-gray-500 text-gray-100 dark:text-gray-900' : ''} rounded flex justify-center items-center bg-none border-2 border-gray-500 py-1 px-2 text-gray-500`}
                >
                    Bullet list
                </button>
                <button type="button"
                        onClick={() => editor.chain().focus().toggleOrderedList().run()}
                        className={`${editor.isActive('orderedList') ? 'bg-gray-500 text-gray-100 dark:text-gray-900' : ''} rounded flex justify-center items-center bg-none border-2 border-gray-500 py-1 px-2 text-gray-500`}
                >
                    Ordered list
                </button>
                <button type="button"
                        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                        className={`${editor.isActive('codeBlock') ? 'bg-gray-500 text-gray-100 dark:text-gray-900' : ''} rounded flex justify-center items-center bg-none border-2 border-gray-500 py-1 px-2 text-gray-500`}
                >
                    Code block
                </button>
                <button type="button"
                        onClick={() => editor.chain().focus().toggleBlockquote().run()}
                        className={`${editor.isActive('blockquote') ? 'bg-gray-500 text-gray-100 dark:text-gray-900' : ''} rounded flex justify-center items-center bg-none border-2 border-gray-500 py-1 px-2 text-gray-500`}
                >
                    Blockquote
                </button>
                <button type="button" onClick={() => editor.chain().focus().setHorizontalRule().run()}
                        className="rounded flex justify-center items-center bg-none border-2 border-gray-500 py-1 px-2 text-gray-500">
                    Horizontal rule
                </button>
                <button type="button" onClick={() => editor.chain().focus().setHardBreak().run()}
                        className="rounded flex justify-center items-center bg-none border-2 border-gray-500 py-1 px-2 text-gray-500">
                    Hard break
                </button>
                <button type="button"
                        onClick={() => editor.chain().focus().undo().run()}
                        className="rounded flex justify-center items-center bg-none border-2 border-gray-500 py-1 px-2 text-gray-500"
                        disabled={!editor.can().chain().focus().undo().run()}>
                    Undo
                </button>
                <button type="button"
                        onClick={() => editor.chain().focus().redo().run()}
                        className="rounded flex justify-center items-center bg-none border-2 border-gray-500 py-1 px-2 text-gray-500"
                        disabled={!editor.can().chain().focus().redo().run()}>
                    Redo
                </button>
            </div>
            <Hr my={true}/>
        </>
    )
}

const extensions = [
    StarterKit.configure({
        bulletList: {
            keepMarks: true,
            keepAttributes: false,
        },
        orderedList: {
            keepMarks: true,
            keepAttributes: false,
        },
    }),
]

export default function Editor(content: { content: ReactElement }) {
    return (
        <div className="bg-gray-200 dark:bg-gray-800 rounded p-5">
            <EditorProvider slotBefore={<MenuBar/>} extensions={extensions} content={content}></EditorProvider>
        </div>
    )
}