(
    function()
    {
        var JihadForm = window.JihadForm = {
        };

        /**
         * Returns form action
         */

        JihadForm.getAction = function($form)
        {
            return $form.attr('action');
        };

        /**
         * Returns post method
         */

        JihadForm.getMethod = function($form)
        {
            return $form.attr('method') || 'POST';
        };

        /**
         * Returns post data
         */

        JihadForm.getData = function($form)
        {
            return $form.serialize();
        };

        /**
         * Hide all error fields
         */

        JihadForm.errorsHide = function($form)
        {
            $form.find('[role="error"]').hide();
        };

        /**
         * Show errors in the form
         */

        JihadForm.errorsShow = function($form, errors)
        {
            var self = this;

            $.each(
                errors,
                function(field, error)
                {
                    self.errorShow($form, field, error);
                }
            );
        };

        /**
         * Error show for field
         */

        JihadForm.errorShow = function($form, field, error)
        {
            $form.find('[role="error"][data-field="' + field + '"]')
                .text(error.message)
                .show()
            ;
        };

        /**
         * Show global error
         */

        JihadForm.errorGlobal = function($form, error)
        {
            alert(error.message);
        };

        /**
         * Before send function
         */

        JihadForm.beforeSend = function($form)
        {
            this.submitsDisable($form);
        };

        /**
         * After send function
         */

        JihadForm.afterSend = function($form)
        {
            this.submitsEnable($form);
        };

        /**
         * Submits disable
         */

        JihadForm.submitsDisable = function($form)
        {
            $form.find('[role="submit"]').prop('disabled', true);
        };

        /**
         * Submits enable
         */

        JihadForm.submitsEnable = function($form)
        {
            $form.find('[role="submit"]').prop('disabled', false);
        };

        /**
         * Success function
         */

        JihadForm.onSuccess = function($form, data, textStatus, jqXHR)
        {
            this.errorsHide($form);

            if (data && data.result)
            {
                if (data.result.errors)
                {
                    this.fail($form, data.result);
                }
                else
                {
                    this.success($form, data.result);
                }
            }
            else
            {
                this.errorGlobal(
                    $form,
                    {
                        message: 'Something is wrong'
                    }
                );
            }
        };

        /**
         * Method called on error
         */

        JihadForm.onError = function($form, jqXHR, textStatus, errorThrown)
        {
            this.errorGlobal(
                $form,
                {
                    message: 'Something is wrong'
                }
            );
        };

        /**
         * Fail function
         */

        JihadForm.fail = function($form, result)
        {
            this.errorsShow($form, result.errors);
        };

        /**
         * Success
         */

        JihadForm.success = function($form, result)
        {
        };

        /**
         * List of registered blocks
         */

        JihadForm.submit = function(form)
        {
            var self = this;
            var $form = $(form);

            $.ajax(
                this.getAction($form),
                {
                    beforeSend: function()
                    {
                        self.beforeSend($form);
                    },
                    complete: function()
                    {
                        self.afterSend($form);
                    },
                    dataType:   'json',
                    data:       this.getData($form),
                    type:       this.getMethod($form),
                    success:    function(data, textStatus, jqXHR)
                    {
                        self.onSuccess($form, data, textStatus, jqXHR);
                    },
                    error: function(jqXHR, textStatus, errorThrown)
                    {
                        self.onError($form, jqXHR, textStatus, errorThrown);
                    }
                }
            );

            return false;
        };
    }
    ()
);
