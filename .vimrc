set nocompatible              " be iMproved, required
filetype off                  " required
syntax enable
colorscheme monokai

set noerrorbells 
set novisualbell
set t_vb=
set vb t_vb=

"set the runtime path to include Vundle and initialize
set rtp+=~/.vim/bundle/Vundle.vim
call vundle#begin()
" alternatively, pass a path where Vundle should install plugins
"call vundle#begin('~/some/path/here')

"let Vundle manage Vundle, required
Bundle 'gmarik/Vundle.vim'

Bundle 'scrooloose/syntastic'
Bundle 'scrooloose/nerdtree'
Bundle 'powerline/powerline'
Bundle 'kien/ctrlp.vim'
Bundle 'terryma/vim-multiple-cursors'

call vundle#end()            " required
filetype plugin indent on    " required

" syntastic
set statusline+=%#warningmsg#
set statusline+=%{syntasticstatuslineflag()}
set statusline+=%*

let g:syntastic_javascript_checkers = ['jshint']
let g:syntastic_always_populate_loc_list = 1
let g:syntastic_auto_loc_list = 1
let g:syntastic_check_on_open = 1
let g:syntastic_check_on_wq = 0

" multiple cursors
let g:multi_cursor_use_default_mapping=0
" Default mapping
let g:multi_cursor_next_key='<C-d>'
let g:multi_cursor_prev_key='<C-p>'
let g:multi_cursor_skip_key='<C-x>'
let g:multi_cursor_quit_key='<Esc>'


" Muneeb Specific
set relativenumber
set number

let mapleader = ","

" Osx Specificsd
:set mouse=a

nnoremap <C-j> :+5<cr>
nnoremap <C-k> :-5<cr>


inoremap <C-s> <esc>:w<cr>
nnoremap <C-s> :w<cr>

inoremap <C-p> :CtrlP
nnoremap <C-p> :CtrlP

inoremap <Leader>k :NERDTreeToggle<cr>
nnoremap <Leader>k :NERDTreeToggle<cr>
