export const inputFiles = () => {
    const fileInputs = document.querySelectorAll('.form__file-input');


    if (fileInputs.length === 0) return;

    fileInputs.forEach(fileInput => {
        let fileListContainer;

        fileInput.addEventListener('change', function () {
            const files = fileInput.files;

            if (fileListContainer) {
                fileListContainer.remove();
            }

            if (files.length === 0) return;

            fileListContainer = document.createElement('ul');
            fileListContainer.classList.add('form__files');
            fileInput.closest('.form__field').appendChild(fileListContainer);

            Array.from(files).forEach((file, index) => {
                const listItem = document.createElement('li');
                listItem.classList.add('form__files-item');

                const fileName = document.createElement('div');
                fileName.classList.add('form__files-name');
                fileName.textContent = file.name;

                const removeBtn = document.createElement('button');
                removeBtn.type = 'button';
                removeBtn.classList.add('form__files-remove', 'icon-clear');
                removeBtn.addEventListener('click', function () {
                    fileListContainer.removeChild(listItem);


                    if (fileListContainer.children.length === 0) {
                        fileListContainer.remove();
                        fileInput.value = '';
                    }
                });

                listItem.appendChild(fileName);
                listItem.appendChild(removeBtn);
                fileListContainer.appendChild(listItem);
            });
        });
    });



}