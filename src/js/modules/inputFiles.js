export const inputFiles = () => {
    const fileInputs = document.querySelectorAll('.form__file-input');

    if (fileInputs.length === 0) return;

    fileInputs.forEach(fileInput => {
        let fileListContainer;
        let currentFileList = new DataTransfer();

        fileInput.addEventListener('change', function () {
            currentFileList = new DataTransfer();
            const files = this.files;

            if (fileListContainer) {
                fileListContainer.remove();
            }

            if (files.length === 0) return;

            fileListContainer = document.createElement('ul');
            fileListContainer.classList.add('form__files');
            fileInput.closest('.form__field').appendChild(fileListContainer);

            Array.from(files).forEach(file => {
                currentFileList.items.add(file);

                const fileNameParts = file.name.split('.');
                const fileFormat = fileNameParts.length > 1 ? fileNameParts.pop() : '';
                const fileNameBase = fileNameParts.join('.');

                const listItem = document.createElement('li');
                listItem.classList.add('form__files-item');

                const fileNameDiv = document.createElement('div');
                fileNameDiv.classList.add('form__files-name');

                const fileNameSpan = document.createElement('span');
                fileNameSpan.classList.add('form__files-base');
                fileNameSpan.textContent = fileNameBase;

                const fileFormatSpan = document.createElement('span');
                fileFormatSpan.classList.add('form__files-format');
                fileFormatSpan.textContent = fileFormat ? `.${fileFormat}` : '';

                const removeBtn = document.createElement('button');
                removeBtn.type = 'button';
                removeBtn.classList.add('form__files-remove', 'icon-clear');

                removeBtn.addEventListener('click', function () {
                    listItem.remove();

                    const fileIndexToRemove = Array.from(currentFileList.files).findIndex(f => f.name === file.name && f.size === file.size);
                    if (fileIndexToRemove > -1) {
                        currentFileList.items.remove(fileIndexToRemove);
                        fileInput.files = currentFileList.files;
                    }

                    if (fileListContainer.children.length === 0) {
                        fileListContainer.remove();
                        fileInput.value = '';
                        currentFileList = new DataTransfer();
                    }
                });

                fileNameDiv.appendChild(fileNameSpan);
                fileNameDiv.appendChild(fileFormatSpan);
                listItem.appendChild(fileNameDiv);
                listItem.appendChild(removeBtn);
                fileListContainer.appendChild(listItem);
            });

            fileInput.files = currentFileList.files;
        });
    });
}