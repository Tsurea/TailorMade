# **************************************************************************** #
#                                                                              #
#                                                         :::      ::::::::    #
#    Makefile                                           :+:      :+:    :+:    #
#                                                     +:+ +:+         +:+      #
#    By: cmariot <cmariot@student.42.fr>            +#+  +:+       +#+         #
#                                                 +#+#+#+#+#+   +#+            #
#    Created: 2022/08/31 16:08:49 by cmariot           #+#    #+#              #
#    Updated: 2023/04/07 15:42:04 by cmariot          ###   ########.fr        #
#                                                                              #
# **************************************************************************** #


all:
	docker compose up --build --detach

clean: stop
	docker system prune -a --force

fclean: stop
	docker system prune -a --force --volumes

re: fclean
	make all

.PHONY: all clean fclean re
